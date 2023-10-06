<script setup>
import { toRefs } from "vue";
import Task from "./Task.vue";
import TaskSkeleton from "./TaskSkeleton.vue";

const props = defineProps({
    status: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})

const { status, tasks, isLoading } = toRefs(props);
</script>

<template>
    <div class="task-list">
        <h3 class="list-label">{{ status }}</h3>
        <div class="tasks-container">
            <div v-if="tasks.length === 0 && !isLoading" class="empty-list">
                <span>You do not have task here...</span>
            </div>
            <TaskSkeleton v-else-if="isLoading" />
            <Task v-for="task in tasks" :key="task.id" :task="task" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-list {
    @apply flex flex-col gap-3 w-full;
    @apply md:w-1/3;

    .list-label {
        @apply uppercase text-center text-base font-bold tracking-widest;
    }

    .tasks-container {
        @apply p-3 flex flex-col gap-5;

        .empty-list {
            @apply border border-dashed border-slate-300 rounded-md text-center p-2 text-slate-400;
        }
    }
}
</style>
