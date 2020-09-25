<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    protected $fillable = [
        "name",
        "email",
        "message",
        "phone",
        "file_id"
    ];

    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
