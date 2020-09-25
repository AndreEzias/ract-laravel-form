<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules =[
            "name" => "required|max:190",
            "email" => "required|email|unique:leads,email|max:250",
            "phone" => "required|max:15|min:14",
            "message" => "max:250"
        ];
        if ($this->has("file")) {
            $rules["file"] = "file|max:500|mimes:pdf,doc,docx,odt,txt";
        }
        return $rules;
    }
}
