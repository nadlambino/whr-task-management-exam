<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Get list of the resource.
     */
    public function index(Request $request, Task $task): JsonResponse
    {
        $status = $request->get('status');
        $tasks = Auth::user()
            ->tasks()
            ->when(!empty($status), function($query) use ($status) {
                $query->where('status', $status);
            })
            ->get()
            ->toArray();

        return $this->successResponse($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTaskRequest $request): JsonResponse
    {
        $model = Auth::user()->tasks()->create($request->validated());

        return $this->successResponse($model->toArray(), [], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
