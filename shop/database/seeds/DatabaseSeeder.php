<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(UnitsTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(ListValuesTableSeeder::class);
        $this->call(ManufacturersTableSeeder::class);
        $this->call(PermissionRoleTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(Product_RequestTableSeeder::class);
        $this->call(Product_SupplyTableSeeder::class);
        $this->call(RequestsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(SuppliesTableSeeder::class);
        $this->call(ValuesTableSeeder::class);
        $this->call(NewsTableSeeder::class);
    }
}
