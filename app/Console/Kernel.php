<?php

namespace App\Console;

use App\Console\Commands\DeleteTrashedTasks;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        DeleteTrashedTasks::class
    ];

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $runEvery = config('app.run_delete_every', 'daily');

        if ($runEvery === 'daily') {
            $schedule->command('tasks:delete')->daily();
        } else {
            $schedule->command('tasks:delete')->everyMinute();
        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
