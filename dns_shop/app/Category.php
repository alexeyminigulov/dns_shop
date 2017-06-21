<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Category extends Eloquent {

    protected $connection = 'mongodb';

    protected $table = 'categories';

    protected $guarded = [
    	'_id',
    ];

    /**
     * Создать категории в виде дерева списков.
     *
     * @return array
     */
    private static function addSubcategories(&$categories) {
        foreach ($categories as &$c) {
            $cats = self::where('parent', $c['_id'])->get()->toArray();
            if( count($cats) ) {
                $c['subcategory'] = $cats;
                self::addSubcategories($c['subcategory']);
            }
        }
    }

    /**
     * Возвращает категории в виде дерева списков.
     *
     * @return array
     */
    public static function getTreeCategories() {
        $categories = self::where('parent', null)->get()->toArray();

        self::addSubcategories($categories);

        return $categories;
    }

    /**
     * Получить список дочерних подкатегории для данной категории.
     *
     * @param  string $url
     * @param  array  $categories
     * @return array
     */
    public static function getSubCategory($url, $categories) {
        static $result;
        foreach ($categories as $category) {
            if( $category['semanticUrl'] == $url ) {
                return $result = $category;
            } else if( !empty($category['subcategory']) && is_array($category['subcategory']) ) {
                self::getSubCategory($url, $category['subcategory']);
            }
        }
        return $result;
    }

}