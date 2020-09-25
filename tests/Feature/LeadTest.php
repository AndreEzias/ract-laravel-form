<?php

namespace Tests\Feature;

use App\Lead;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LeadTest extends TestCase
{
    use WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCreate()
    {
        $data = $this->getFaked();
        $response = $this->postJson('/api/leads', $data);
        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function testCreateNoRequired()
    {
        $data = $this->getFaked();
        $requires = ["phone","name","email"];
        unset($data[$this->faker->randomElement($requires)]);
        $response = $this->postJson(
            '/api/leads',
            $data
        );
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $response->assertJsonStructure(["message","errors"]);
    }

    public function testCreateMaxSize()
    {
        $data = $this->getFaked();
        $invalids = [
            "name" => str_repeat("*",191),
            "email" => str_repeat("*",250)."@teste.com",
            "message" => str_repeat("*",501),
            "phone" => "(11) 99999-9999*",
            "file" => UploadedFile::fake()->image("wrong.jpg")->size(501)
        ];
        $invalidSelected = $this->faker->randomElement(array_keys($invalids));
        $data[$invalidSelected] = $invalids[$invalidSelected];
        $response = $this->postJson(
            '/api/leads',
            $data
        );
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $response->assertJsonStructure(["message","errors"]);
    }

    protected function getFaked(): array
    {
        $fileName = $this->faker->word.".".$this->faker->randomElement(["jpg","png"]);
        $data = (factory(Lead::class)->make())->toArray();
        unset($data["file_id"]);
        $data["file"] = UploadedFile::fake()->image($fileName)->size(500);
        return $data;
    }
}
