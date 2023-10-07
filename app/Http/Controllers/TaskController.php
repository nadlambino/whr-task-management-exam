<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
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
        $search = $request->get('search');
        $status = $request->get('status');
        $sort = $request->get('sort');
        $sortDir = $request->get('sort_dir');
        $isTrashed = (int) $request->get('is_trashed', 0);
        $tasks = Auth::user()
            ->tasks()
            ->when(!empty($status), function($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($isTrashed, function($query) {
                $query->whereNotNull('trashed_at');
            })
            ->when(!$isTrashed, function($query) {
                $query->whereNull('trashed_at');
            })
            ->when(!is_null($search), function($query) use ($search) {
                $query->where(function($query) use ($search) {
                    $query->where('title', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%");
                });
            })
            ->when(!is_null($sort) && !is_null($sortDir), function ($query) use ($sort, $sortDir) {
                $query->orderBy($sort, $sortDir);
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
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        if (Auth::id() !== $task?->user_id) {
            return $this->errorResponse('Unauthorized', [], 403);
        }

        $data = $request->validated();
        $task->title = $data['title'];
        $task->description = $data['description'];
        $task->status = $data['status'] ?? 'todo';
        $task->save();

        return $this->successResponse($task->refresh()->toArray());
    }

    public function restore(Task $task): JsonResponse
    {
        if (Auth::id() !== $task?->user_id) {
            return $this->errorResponse('Unauthorized', [], 403);
        }

        $task->trashed_at = null;
        $task->save();

        return $this->successResponse($task->refresh()->toArray());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (Auth::id() !== $task?->user_id) {
            return $this->errorResponse('Unauthorized', [], 403);
        }

        $task->trashed_at = now();
        $task->save();

        return $this->successResponse($task->refresh()->toArray());
    }

    public function delete(Task $task)
    {
        if (Auth::id() !== $task?->user_id) {
            return $this->errorResponse('Unauthorized', [], 403);
        }

        $task->delete();

        return $this->successResponse($task->refresh()->toArray());
    }
}
