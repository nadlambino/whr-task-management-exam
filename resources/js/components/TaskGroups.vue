<script setup>
import TaskList from "./TaskList.vue";
import {useTaskStore} from "../store/taskStore.js";

const taskStore = useTaskStore();
</script>

<template>
    <div class="task-groups">
        <TaskList class="task-list-container" status="TODO" :tasks="taskStore.todos" :is-loading="taskStore.isLoading" />
        <TaskList class="task-list-container" status="IN PROGRESS" :tasks="taskStore.inProgress" :is-loading="taskStore.isLoading" />
        <TaskList class="task-list-container" status="COMPLETED" :tasks="taskStore.completed" :is-loading="taskStore.isLoading" />
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-groups {
    @apply flex flex-col justify-between w-full mt-5 gap-6;
    @apply md:flex-row md:h-[calc(100vh-150px)] md:gap-0;
}

.task-list-container {
    &:nth-child(even) {
        @apply border-t border-b py-5;
        @apply md:py-0 md:border-t-0 md:border-b-0 md:border-r md:border-l border-slate-300 border-dashed
    }
}
</style>
