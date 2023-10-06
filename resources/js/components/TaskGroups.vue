<script setup>
import TaskList from "./TaskList.vue";
</script>

<template>
    <div class="task-groups">
        <TaskList class="task-list-container" status="TODO" :tasks="[]" />
        <TaskList class="task-list-container" status="IN PROGRESS" :tasks="[]" />
        <TaskList class="task-list-container" status="COMPLETED" :tasks="[]" />
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-groups {
    @apply flex flex-col justify-between w-full mt-5;
    @apply md:flex-row md:h-[calc(100vh-150px)];
}

.task-list-container {
    &:nth-child(even) {
        @apply md:border-r md:border-l border-slate-300 border-dashed
    }
}
</style>
