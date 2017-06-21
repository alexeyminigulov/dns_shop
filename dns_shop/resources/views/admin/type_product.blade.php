@extends('layouts.app')


@section('styles')

<style>

</style>

@endsection




@section('content')

<div class="container">
  <form action="{{ route('addTable') }}" method="POST">
  	{{ csrf_field() }}

  	<div class="form-group">
  		<label for="name-table">Name Table:</label>
		<input type="text" name="name-table" id="name-table" placeholder="Enter name table" class="name-table">
  	</div>
  	<div class="form-group">
  		<label for="semantic-url">URL Adress:</label>
		<input type="text" name="semantic-url" id="semantic-url" placeholder="Enter ЧПУ" class="semantic-url">
  	</div>

	<div class="list-fields">
		<div class="form-group">
			<label for="field-1">Name:</label>
			<input type="text" name="field-1" id="field-1" placeholder="Enter name" class="field-name">
			<div class="type-field">
			<label class="type-field" for="type-field-1">Type:</label>
			<select class="type-field" name="type-field-1" id="type-field-1">
			    <option selected value="string">Строка</option>
			    <option value="integer">Число</option>
			    <option value="list">Список</option>
			</select>
			</div>
			<input type="button" value="+" class="btn add-more">
		</div>
	</div>

	<div class="form-group">
		<input type="submit" value="Add table" id="submit-new-table">
	</div>

 </form>
</div>

@endsection


@section('libs')

<script type="text/javascript">
"use strict";

$(document).ready(function(){

	//	DOM
	var listFields = document.querySelector(".list-fields"),
		addMore = listFields.querySelector(".add-more"),
		submitNewTable = document.getElementById("submit-new-table");
		


	var next = 1,
		token = '{{ Session::token() }}',
		listUnit = {},
		listValue = {},
		fields = [],
		newTable = {};





	;(function () {

		$.ajaxSetup({
		    headers: {
		        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		    }
		});

    	$.ajax({
			method: 'POST',
			url: "{{route('createPost')}}",
			data: {_token: token}
		})
		.done(function(msg) {

			listUnit = msg.units;
			listValue = msg.listValue;
			console.log(listUnit);
			console.log(listValue);
		});
    }) ();
	

	function createElements(target, className, innerHTML, regex, parentNode) {

		var elem = document.createElement('div');

    	elem.className = className;
    		
    	innerHTML = innerHTML.replace(/{:{next}:}/g, regex);
    	elem.innerHTML = innerHTML;
    	parentNode.appendChild(elem);
	}



	submitNewTable.onclick = function(e){
		e.preventDefault;
		var nameTable = listFields.parentNode.querySelector("input[type='text'].name-table").value;
		var semanticUrl = listFields.parentNode.querySelector("input[type='text'].semantic-url").value;
		var formGroupInListFields = listFields.getElementsByClassName("form-group");	// Список полей под разные элементы массива

		for(var i = 0; i < formGroupInListFields.length; i++){

			var obj ={};
			var fieldInputName = formGroupInListFields[i].querySelector(".field-name").value;
			var typeFieldValue = formGroupInListFields[i].querySelector("select.type-field").value;
			obj.name = fieldInputName;
			obj.type = {};
			obj.type.name = typeFieldValue;

			if(typeFieldValue === "integer") {
				var divIntField = formGroupInListFields[i].querySelector(".int_field");
				var unitValue = divIntField.querySelector(".unit-field").value;
				var minValue = divIntField.querySelector(".min").value;
				var maxValue = divIntField.querySelector(".max").value;
				obj.type.unit = unitValue;
				obj.type.min = minValue;
				obj.type.max = maxValue;
			}
			if(typeFieldValue === "list") {
				var divListField = formGroupInListFields[i].querySelector(".list_field");
				var list = divListField.querySelector("select.list-field").value;
				obj.type.list = list;
			}

			fields.push(obj);
		}

		newTable.name = nameTable;
		newTable.semanticUrl = semanticUrl;
		newTable.fields = fields;
		newTable = JSON.stringify(newTable);	//  переводим динамические поля в json
		//console.log(newTable);


		$.ajax({
		  method: "POST",
		  dataType: "json",	// Какие данные получаем от сервера
		  url: "{{route('createNewTable')}}",
		  data: {_token: token, _newTable: newTable}
		})
		  .done(function( msg ) {
		    console.log( msg );
		  });


		newTable = {};	//  Чистием таблицу
		fields = [];	// Чистием массив
		return false;	// чтобы не сработало событие submit
	};



    listFields.onclick = function(e){

    	e.preventDefault;
    	var target = e.target;


    	function addField(){
			
    		var className = "form-group";
    		var str = `
					<label for="field-{:{next}:}">Name:</label>
					<input type="text" name="field-{:{next}:}" id="field-{:{next}:}" placeholder="Enter name" class="field-name">
					<div class="type-field">
					<label class="type-field" for="type-field-{:{next}:}">Type:</label>
					<select class="type-field" name="type-field-{:{next}:}" id="type-field-{:{next}:}">
					    <option selected value="string">Строка</option>
					    <option value="integer">Число</option>
					    <option value="list">Список</option>
					</select>
					</div>
					<input type="button" value="+" class="btn add-more">
    			`;
    		var parentNode = target.parentNode.parentNode;
    		
    		createElements(target, className, str, next, parentNode);

			
			target.className = "btn remove-field";
			target.value = "-";
		}



    	if(target.className === "btn add-more") {


    		next++;
    		addField();
    	}
    	else if(target.className === "btn remove-field") {


    		var parentNode = {};

    		while(parentNode.className != "form-group") {

    			parentNode = target.parentNode;
    		}
    		parentNode.parentNode.removeChild(parentNode);
    	}
    	else {

    		return;
    	}



    };



    listFields.onchange = function(e) {

    	e.preventDefault;
    	var target = e.target;



    	function typeField(value){


    		if(value === "integer") {

    			var options = "";
    			var className = "int_field";
    			var str = `
    				<label for='unit-field-{:{next}:}'>Unit:</label>
    				<select class="unit-field" name="unit-field-{:{next}:}" id="unit-field-{:{next}:}">
    				`;

				for (var key in listUnit) {

					options += "<option value='" +[key]+ "'>" +listUnit[key]+ "</option>"
				}

				str += options;

				str += `
					</select>

    				<br>
    				
    				<label for='min-{:{next}:}'>Minimum:</label> <input type='text' name='min-{:{next}:}' id='min-{:{next}:}' placeholder='Minimum' class="min">
    				<label for='max-{:{next}:}'>Maximum:</label> <input type='text' name='max-{:{next}:}' id='max-{:{next}:}' placeholder='Maximum' class="max">
    				`;
    			var parentNode = target.parentNode;

    			createElements(target, className, str, next, parentNode);
    		}




    		if(value === "list") {

    			var options = "";
    			var className = "list_field";
    			var str = `
    				<label for='list-field-{:{next}:}'>List:</label>
    				<select class="list-field" name="list-field-{:{next}:}" id="list-field-{:{next}:}">
    				`;

				for (var key in listValue) {

					options += "<option value='" +[key]+ "'>" +listValue[key]+ "</option>"
				}

				str += options;

				str += `
					</select>
    				`;
    			var parentNode = target.parentNode;

    			createElements(target, className, str, next, parentNode);
    		}





    		if(value !== "integer") {

    			var minMaxElement = null;

    			if( minMaxElement = target.closest(".form-group").querySelector(".int_field") ) {

    				minMaxElement.parentNode.removeChild(minMaxElement);
    			}
    		}
    		if(value !== "list") {

    			var lists = null;

    			if( lists = target.closest(".form-group").querySelector(".list_field") ) {

    				lists.parentNode.removeChild(lists);
    			}
    		}
    	}

    	if(target.className === "type-field") {

    		typeField(target.value);
    	}
    };


    
});

</script>

@endsection
