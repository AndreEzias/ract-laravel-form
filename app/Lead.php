<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        "name",
        "email",
        "message",
        "phone",
        "file_id"
    ];

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
