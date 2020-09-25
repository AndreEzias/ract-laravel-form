<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lead;
use Faker\Generator as Faker;

$factory->define(Lead::class, function (Faker $faker) {
    return [
        "name" => $faker->name,
        "email" => $faker->email,
        "phone" => "(11) 99999-9999",
        "file_id" => 0
    ];
});
