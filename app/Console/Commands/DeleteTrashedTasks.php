<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class DeleteTrashedTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete trashed tasks';

    /**
     * Execute the console command.
     */
    public function handle(Task $task)
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        $task->query()
            ->whereNotNull('trashed_at')
            ->where('trashed_at', '<=', $thirtyDaysAgo)
            ->delete();
    }
}
