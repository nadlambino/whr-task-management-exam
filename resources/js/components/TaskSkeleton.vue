<script setup>

</script>

<template>
    <div class="task">
        <div class="task-header">
            <h2 class="title"></h2>
            <button class="options-btn">⋮</button>
        </div>
        <p class="description"></p>
        <p class="description"></p>
        <div class="info">
            <small>
                <span></span>
                <span></span>
            </small>
            <small>
                <span></span>
                <span></span>
            </small>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task {
    @apply border border-t-4 border-slate-300 p-3 rounded-md
    flex flex-col gap-2 animate-pulse;

    .task-header {
        @apply flex gap-5 justify-between items-center;

        .title {
            @apply font-bold text-lg truncate bg-slate-200 w-full h-8 animate-pulse;
        }

        .options-btn {
            @apply font-bold text-slate-300 animate-pulse
        }
    }

    .description {
        @apply bg-slate-200 h-5 w-full animate-pulse;
    }

    .info {
        @apply flex flex-col border-t border-t-slate-200 pt-2 mt-2;

        small {
            @apply flex justify-between mb-1;

            span {
                @apply bg-slate-200 h-3 w-1/3 animate-pulse;
            }
        }
    }
}
</style>
