<script setup>
import {useFormStore} from "../store/formStore.js";
import TaskForm from "./TaskForm.vue";
import TrashedTaskModal from "./TrashedTaskModal.vue";
import {useTrashStore} from "../store/trashStore.js";
import {useTaskStore} from "../store/taskStore.js";

const formStore = useFormStore()
const trashStore = useTrashStore()
const taskStore = useTaskStore()
</script>

<template>
    <TaskForm />
    <TrashedTaskModal />
    <div class="task-menu">
        <div class="search-container">
            <v-text-field variant="outlined" density="compact" label="Search a task..." v-model="taskStore.search" />
        </div>
        <div class="button-container">
            <v-btn
                class="button secondary-button text-xs"
                variant="tonal"
            >
                <v-icon icon="mdi-sort" class="mr-2"/>
                <span v-show="!taskStore.sortText">SORT BY</span>
                <span v-show="taskStore.sortText" class="uppercase">{{ taskStore.sortText }}</span>
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item @click="taskStore.handleSortChange('title', 'asc')">
                            <v-list-item-title>Title (asc)</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="taskStore.handleSortChange('title', 'desc')">
                            <v-list-item-title>Title (desc)</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="taskStore.handleSortChange('created_at', 'asc')">
                            <v-list-item-title>Created Date (asc)</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="taskStore.handleSortChange('created_at', 'desc')">
                            <v-list-item-title>Created Date (desc)</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn
                class="button secondary-button text-xs"
                variant="tonal"
                @click="trashStore.handleIsOpen(true)"
            >
                <v-icon icon="mdi-delete-variant" class="mr-2"/>
                TRASH
            </v-btn>
            <v-btn
                class="button main-button text-xs"
                variant="tonal"
                @click="formStore.handleFormState(true, 'create')"
                :disabled="formStore.isOpen"
            >
                <v-icon icon="mdi-plus-box-multiple-outline" class="mr-2"/>
                NEW
            </v-btn>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.task-menu {
    @apply flex flex-col justify-between gap-5;
    @apply md:flex-row;

    .search-container {
        @apply order-2 md:order-1 w-full md:w-2/4;
    }

    .button-container {
        @apply order-1 gap-2 justify-between overflow-x-auto;
        @apply md:order-2 flex md:justify-end;

        ::-webkit-scrollbar-thumb {
            @apply hidden w-0;
        }
    }
}
</style>
