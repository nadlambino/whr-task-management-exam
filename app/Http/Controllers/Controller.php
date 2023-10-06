<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function successResponse(array $data = [], array $meta = [], int $code = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => $data,
            'meta' => $meta
        ], $code);
    }

    public function errorResponse(string $message, array $errors = [], int $code = 500): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors'  => $errors
        ], $code);
    }
}
