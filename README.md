# Task Management App

## How to set up local server
System Requirements
* PHP 8.2.4
* Node 18.16.1
* MySQL

## Steps
* Clone the <a href="https://github.com/nadlambino/whr-task-management-exam.git">repository</a>
* Run `composer install` and `npm install`
* Create a database named `whr-task-management-exam` or any other name, just update what is on the `.env` file.
* Run `php artisan migrate`
* Run `php artisan serve --port=80`. Make sure that it is running on port `80` for sanctum to work
* Run `npm run dev`
* You can now visit the app at <a href="http://localhost">http://localhost</a>

### Cron Job (Auto Deletion of Trashed Tasks)
To automatically delete tasks that were already trashed for 30 days
* Customize the configs in `.env` file. Look for the `DELETE_TRASH_OLD` and `RUN_DELETE_EVERY` keys
* `DELETE_TRASH_OLD` is the number of days a task is in the trash for it to be automatically deleted. 
Change to `0` if you want to test deletion of tasks that are recently trashed.
Default value is `30`
* `RUN_DELETE_EVERY` is use to determine how often the cron job should run. 
Accepted values are `daily` and `minute`. 
`daily` runs every day at midnight.
Use `minute` if you want to test it immediately.
Default is `daily`.
* Run `php artisan schedule:work`
* You can also manually test it using `php artisan tasks:delete`

### Note
If something is not working, please run `php artisan optimize`
