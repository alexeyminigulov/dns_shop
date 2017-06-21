<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class TypeProduct extends Eloquent {

    protected $connection = 'mongodb';

    protected $table = 'type_product';

    /**
     * Обновляем и изменяем для типа integer, list
     *
     * @param  array  $fields
     * @return array
     */
    public static function updateFieldType($fields)
    {
        foreach ($fields as $key => &$value) {
            if($value['type']['name'] === 'integer') {
                $value['type']['unit'] = Unit::where('id', $value['type']['unit'])->first()->name;
            }
            else if($value['type']['name'] === 'list') {
                $value['type']['listValue'] = ListValue::where('id', $value['type']['listValue'])
                    ->first()->values->lists('name', 'id')->toArray();
            }
        }
        return $fields;
    }

}