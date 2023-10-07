<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'status', 'trashed_at'];

    protected $casts = [
        'created_at' => 'datetime:M d Y h:i A'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => is_null($value) ? null : Carbon::parse($value, 'UTC')
                ->setTimezone('Asia/Singapore')
                ->format('M d Y h:i A'),
        );
    }

    public function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => is_null($value) ? null : Carbon::parse($value, 'UTC')
                ->setTimezone('Asia/Singapore')
                ->format('M d Y h:i A'),
        );
    }

    public function trashedAt(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => is_null($value) ? null : Carbon::parse($value, 'UTC')
                ->setTimezone('Asia/Singapore')
                ->format('M d Y h:i A'),
        );
    }
}
