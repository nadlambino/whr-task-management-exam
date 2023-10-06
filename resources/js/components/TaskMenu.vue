<script setup>
import {useFormStore} from "../store/formStore.js";

const formStore = useFormStore()
</script>

<template>
    <nav class="task-menu">
        <v-btn
            class="button main-button"
            variant="tonal"
            @click="formStore.handleFormState(true, 'create')"
            :disabled="formStore.isOpen"
        >
            New Task
        </v-btn>
    </nav>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";
</style>
