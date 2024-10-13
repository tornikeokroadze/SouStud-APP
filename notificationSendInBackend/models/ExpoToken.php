<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpoToken extends Model
{
    use HasFactory;

    protected $table = 'push_notification';
    public $primaryKey = 'id';
    public $timestemps = true;
    protected $fillable = ['expo_token', 'users_id'];
}
