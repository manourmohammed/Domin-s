<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NetworkResult extends Model
{
    protected $fillable = [
        'domaine_id',
        'ping',
        'http_status',
        'ssl_expiration',
    ];

    public function domaine()
    {
        return $this->belongsTo(Domaine::class);
    }
}

