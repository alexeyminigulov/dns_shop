@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
<?php echo $typeProduct ?>

			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createProduct">Default</button>
			<!-- Modal -->
			  <div class="modal fade" id="createProduct" role="dialog">
			    <div class="modal-dialog modal-lg">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal">&times;</button>
			          <h4 class="modal-title">Add Product</h4>
			        </div>
			        <div class="modal-body">
			          <form action="{{ route('addProduct') }}" method="POST" class="form-horizontal">
			            {{ csrf_field() }}
			            <input name="type_product_id" type="hidden" value="{{ $typeProduct['_id'] }}">

						<div class="form-group">
			                <label for="product-name" class="col-sm-3 control-label">Name</label>

			                <div class="col-sm-6">
			                    <input type="text" name="name" id="product-name" class="form-control">
			                </div>
			            </div>
			            <div class="form-group">
			                <label for="product-description" class="col-sm-3 control-label">Description</label>

			                <div class="col-sm-6">
			                    <textarea class="form-control" name="description" rows="5" id="product-description"></textarea>
			                </div>
			            </div>
			            <div class="form-group">
			                <label for="product-price" class="col-sm-3 control-label">Price</label>

			                <div class="col-sm-6">
			                    <input type="text" name="price" id="product-price" class="form-control">
			                </div>
			            </div>

			            <!-- Add Fields -->
			            @if( $typeProduct["fields"] and ( $typeProduct["fields"]>0 ) )
				            @foreach($typeProduct["fields"] as $field => $value)
				            <div class="form-group">
				                <label for="product-{{ $field }}" class="col-sm-3 control-label">{{ $value['name'] }}</label>

				                <div class="col-sm-6">
				                    <input type="text" name="{{$field}}" id="product-{{ $field }}" class="form-control">
				                </div>
				            </div>
				            @endforeach
			            @endif

			            <!-- Add Task Button -->
			            <div class="form-group">
			                <div class="col-sm-offset-3 col-sm-6">
			                    <button type="submit" class="btn btn-default">
			                        <i class="fa fa-plus"></i> Add Product
			                    </button>
			                </div>
			            </div>
			        </form>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>


			<table class="table">
		    <thead>
		      <tr>
		        <th>id</th>
		        <th>name</th>
		        <th>price</th>

				@if( $typeProduct["fields"] and ( $typeProduct["fields"]>0 ) )
			        @foreach($typeProduct["fields"] as $field => $value)
			        <th>{{ $value['name'] }}</th>
			        @endforeach
		        @endif

		      </tr>
		    </thead>
		    <tbody>
		    @if( $products )
		    @foreach($products as $product)
		      <tr>
		        <td>{{ $product['id'] }}</td>
		        <td>{{ $product['name'] }}</td>
		        <td>{{ $product['price'] }}</td>
		        @foreach($typeProduct["fields"] as $field=>$value)
		        <td>{{ $product['fields'][$field] }}</td>
		        @endforeach
		      </tr>
		    @endforeach
		    @endif
		    </tbody>
		  </table>

        </div>
    </div>
</div>
@endsection
