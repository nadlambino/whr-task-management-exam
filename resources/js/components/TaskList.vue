<script setup>
import {toRefs} from "vue";

const props = defineProps({
    status: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    }
})

const { status, tasks } = toRefs(props);
</script>

<template>
    <div class="task-list">
        <h3 class="list-label">{{ status }}</h3>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-list {
    @apply flex flex-col gap-3 w-full;

    .list-label {
        @apply uppercase text-center text-base font-bold tracking-widest;
    }
}
</style>
