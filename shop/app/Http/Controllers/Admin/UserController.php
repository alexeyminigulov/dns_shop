<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
//use App\Http\Requests;
use App\User;
use Auth;
use File;
use Gate;
use Carbon\Carbon;
use Intervention\Image\Facades\Image;
use Mockery\CountValidator\Exception;

class UserController extends Controller
{
    public function __construct()
    {
        //
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $user->getPermissions();
        return response()->json( $user );
    }

    public function getAll()
    {
        $user = Auth::user();
        $usr  = new User();
        if( Gate::denies('getAll', $usr) )
        {
            return abort(404);
        }
        $users = User::all();
        return response()->json( $users );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        if( !$request->has('id')
            || !$request->has('first_name')
            || !$request->has('last_name')
            || !$request->has('sex')
        )
            return response()->json( ["status" => 404] );

        $user = Auth::user();
        $user->sex = $request->input('sex');
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        if( $request->has('birth_date') )
        {
            $date = Carbon::createFromFormat( 'd-m-Y', $request->input('birth_date') );
            $user->birth_date = $date;
        }

        if( !$request->hasFile('photo') )
        {
            $user->save();
            return response()->json( ['status' => 200] );
        }

        if( !empty($user->photo) )
            File::delete( 'images/' . $user->photo );
        $file = $request->file('photo');
        $fileName = time() . $file->getClientOriginalName();
//        $file->move('images', $fileName);

        $imageFile = Image::make($file);
        $imageSize = ($imageFile->width() > $imageFile->height())
                        ? $imageFile->width() : $imageFile->height();
        $imageFile->fit( $imageSize, $imageSize )
            ->save( public_path() . '/images/' . $fileName );

        $user->photo = $fileName;
        $user->save();

        return response()->json( [ 'status' => 200, 'photo' => $user->photo ] );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getRoles()
    {
        $roles = Role::all();

        return response()->json( $roles );
    }

    public function editUser(Request $request)
    {
        $user = Auth::user();
        $usr = new User();
        if( !$request->has('user_id') or !$request->has('role_id') or
            ($request['user_id'] == $user->id) or Gate::denies('editUser', $usr) )
        {
            return abort(404);
        }

        try {
            $user = User::findOrFail($request->input('user_id'));
            $role = Role::findOrFail($request->input('role_id'));
            if( $user->isAdmin() ) {
                throw new Exception('No permission to change administrator settings!');
            }
            $user->role_id = $request->input('role_id');
            $user->save();
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        catch(\Exception $e)
        {
            return abort(404);
        }

        return response()->json( $request->all() );
    }
}
