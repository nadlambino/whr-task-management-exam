<script setup>
import {useFormStore} from "../store/formStore.js";

const formStore = useFormStore()
</script>

<template>
    <nav class="task-menu">
        <button
            class="btn btn-primary"
            @click="formStore.handleFormState(true, 'create')"
            :disabled="formStore.isOpen">
            New Task
        </button>
    </nav>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";
</style>
