<script setup>
import {ref, toRefs} from "vue";
import TaskOptions from "./TaskOptions.vue";
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

const { task } = toRefs(props);
const isOptionsOpen = ref(false)

function handleOptionsToggle() {
    isOptionsOpen.value = !isOptionsOpen.value
}

const containerRef = ref()
onClickOutside(containerRef, handleOptionsToggle)

</script>

<template>
    <div class="task" :class="task.status">
        <div class="task-header">
            <h2 class="title">{{ task.title }}</h2>
            <button class="options-btn" @click="handleOptionsToggle">⋮</button>
            <TaskOptions v-if="isOptionsOpen" ref="containerRef" />
        </div>
        <p class="description">{{ task.description }}</p>
        <div class="info">
            <small>
                <span>Created At</span>
                <span>{{ task.created_at }}</span>
            </small>
            <small>
                <span>Updated At</span>
                <span>{{ task.updated_at }}</span>
            </small>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task {
    @apply border border-t-4 border-slate-400 p-3 rounded-md
    flex flex-col gap-2;

    &.todo {
        @apply border-t-blue-500;
    }

    &.inprogress {
        @apply border-t-orange-500;
    }

    &.completed {
        @apply border-t-green-500;
    }

    .task-header {
        @apply flex gap-5 justify-between items-center relative;

        .title {
            @apply font-bold text-lg truncate;
        }

        .options-btn {
            @apply font-bold
        }
    }

    .info {
        @apply flex flex-col border-t border-t-slate-200 pt-2;

        small {
            @apply flex justify-between;
        }
    }
}
</style>
