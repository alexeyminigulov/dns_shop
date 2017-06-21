<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    public function listValue()
    {
        return $this->belongsTo('App\ListValue', 'list_value_id', 'id');
    }
}
