<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function responses()
    {
        return $this->hasMany(ResponseForm::class);
    }

    public function isActive() {
        $currentTime = time();
        if ($this->start_date != null && $this->end_date != null) {
            return $currentTime >= strtotime($this->start_date) && $currentTime <= strtotime($this->end_date);
        }

        return true;
    }
}
