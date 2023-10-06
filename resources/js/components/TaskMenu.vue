<script setup>
import {useFormStore} from "../store/formStore.js";
import TaskForm from "./TaskForm.vue";

const formStore = useFormStore()
</script>

<template>
    <TaskForm />
    <div class="task-menu">
        <v-btn
            class="button main-button"
            variant="tonal"
            @click="formStore.handleFormState(true, 'create')"
            :disabled="formStore.isOpen"
        >
            New Task
        </v-btn>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-menu {

}
</style>
