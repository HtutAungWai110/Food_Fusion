<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MyCookbook extends Model
{
    //
    use HasUuids;

    protected $table = "mycookbook";

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $timestamps = true;

    protected $fillable = [
        "recipe_id",
        "user_id",
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function recipe(): BelongsTo {
        return $this->belongsTo(Recipe::class);
    }


}
