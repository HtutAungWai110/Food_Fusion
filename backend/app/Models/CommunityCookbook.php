<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunityCookbook extends Model
{
    use HasUuids;

    protected $table = 'community_cookbook';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'post_description',
        'image_path',
        'likes',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(CommunityCookbookComment::class, 'post_id');
    }



    protected $appends = ["image_url"];

    public function getImageUrlAttribute()
    {

        if ($this->image_path) {
            return url('storage/' . $this->image_path);
        }
        return null;
    }



}
