<script setup>
import {useFormStore} from "../store/formStore.js";
import TaskForm from "./TaskForm.vue";

const formStore = useFormStore()
</script>

<template>
    <TaskForm />
    <div class="task-menu">
        <v-btn
            class="button danger-button text-xs"
            variant="tonal"
        >
            <v-icon icon="mdi-delete-outline" class="mr-2"/>
            DELETE
        </v-btn>
        <v-btn
            class="button main-button text-xs"
            variant="tonal"
            @click="formStore.handleFormState(true, 'create')"
            :disabled="formStore.isOpen"
        >
            <v-icon icon="mdi-plus-box-multiple-outline" class="mr-2"/>
            NEW TASK
        </v-btn>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-menu {
    @apply flex justify-end gap-2
}
</style>
