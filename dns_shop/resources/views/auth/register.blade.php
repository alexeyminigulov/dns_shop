@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-7 col-md-offset-3">
            <div class="register-blanke">
                <div class="register-heading">Регистрация</div>
                <div class="register-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('first_name') ? ' has-error' : '' }}">
                            <label for="first_name" class="control-label">Имя</label>
                            <div>
                                <input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}">
                                @if ($errors->has('first_name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('first_name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('last_name') ? ' has-error' : '' }}">
                            <label for="last_name" class="control-label">Фамилия</label>
                            <div>
                                <input id="last_name" type="text" class="form-control" name="last_name" value="{{ old('last_name') }}">
                                @if ($errors->has('last_name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('last_name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('sex') ? ' has-error' : '' }}">
                            <label for="sex" class="control-label">Пол</label>
                            <div>
                                {{--<input id="sex" type="text" class="form-control" name="sex" value="{{ old('sex') }}">--}}
                                <select id="sex" class="form-control" name="sex">
                                    <option {{ (old('sex') === 'male') ? 'selected' : '' }} value="male">мужской</option>
                                    <option {{ (old('sex') === 'female') ? 'selected' : '' }} value="female">женский</option>
                                </select>
                                @if ($errors->has('sex'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('sex') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('birth_date') ? ' has-error' : '' }}">
                            <label for="birth_date" class="control-label">Дата рождения</label>
                            <div>
                                <input id="birth_date" type="text" class="form-control" name="birth_date" value="{{ old('birth_date') }}">
                                @if ($errors->has('birth_date'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('birth_date') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('login') ? ' has-error' : '' }}">
                            <label for="login" class="control-label">Login</label>
                            <div>
                                <input id="login" type="text" class="form-control" name="login" value="{{ old('login') }}">
                                @if ($errors->has('login'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('login') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="control-label">E-Mail Address</label>
                            <div>
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}">
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="control-label">Password</label>
                            <div>
                                <input id="password" type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <label for="password-confirm" class="control-label">Confirm Password</label>
                            <div>
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation">
                                @if ($errors->has('password_confirmation'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div>
                                <button type="submit" class="btn btn-primary">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
