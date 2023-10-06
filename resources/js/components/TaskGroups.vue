<script setup>
import TaskList from "./TaskList.vue";
import { useQuery } from '@tanstack/vue-query';
import {computed} from "vue";

const { data, isLoading } = useQuery({
    queryKey: ['tasks', 'todo'],
    queryFn: async () => {
        return await Promise.all([
            await window.axios.get('/api/tasks?status=todo'),
            await window.axios.get('/api/tasks?status=inprogress'),
            await window.axios.get('/api/tasks?status=completed'),
        ]);
    }
})
const todos = computed(() => {
    return data?.value && data.value[0] ? data.value[0].data.data : []
})
const inProgress = computed(() => {
    return data?.value && data.value[1] ? data.value[1].data.data : []
})
const completed = computed(() => {
    return data?.value && data.value[2] ? data.value[2].data.data : []
})
</script>

<template>
    <div class="task-groups">
        <TaskList class="task-list-container" status="TODO" :tasks="todos" :is-loading="isLoading" />
        <TaskList class="task-list-container" status="IN PROGRESS" :tasks="inProgress" :is-loading="isLoading" />
        <TaskList class="task-list-container" status="COMPLETED" :tasks="completed" :is-loading="isLoading" />
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
