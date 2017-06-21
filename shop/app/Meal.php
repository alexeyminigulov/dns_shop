<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Meal extends Eloquent {

    protected $connection = 'mongodb';

}