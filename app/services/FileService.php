<?php

namespace App\Services;

use App\File;
use Illuminate\Http\UploadedFile;

class FileService
{
    public function store(UploadedFile $file)
    {
        return File::query()->create([
            "original_name" => $file->getClientOriginalName(),
            "path" => $file->store("file")
        ]);
    }
}
