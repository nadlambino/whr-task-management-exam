<script setup>
import {ref, toRefs, watch} from "vue";
import {useFormStore} from "../store/formStore.js";

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})
const { task } = toRefs(props)
const formStore = useFormStore();
const status = ref();
watch(status, handleChangeStatus)

function handleChangeStatus() {
    formStore?.handleFormState(false, 'update', {
        ...task?.value,
        status: status.value
    });
    formStore?.handleFormSubmit();
}

function handleDelete() {
    formStore?.handleFormState(false, 'delete', task.value);
    formStore?.handleFormSubmit();
}
</script>

<template>
    <div class="options-container">
        <div class="move-to-item">
            <v-label>Move to</v-label>
            <div class="flex gap-1" v-show="task.status !== 'todo'">
                <input type="radio" id="todo" value="todo" v-model="status" name="status" :disabled="formStore.isFormSubmitting" />
                <label for="todo">Todo</label>
            </div>
            <div class="flex gap-1" v-show="task.status !== 'inprogress'">
                <input type="radio" id="inprogress" value="inprogress" v-model="status" name="status" :disabled="formStore.isFormSubmitting" />
                <label for="inprogress">In Progress</label>
            </div>
            <div class="flex gap-1" v-show="task.status !== 'completed'">
                <input type="radio" id="completed" value="completed" v-model="status" name="status" :disabled="formStore.isFormSubmitting" />
                <label for="completed">Completed</label>
            </div>
        </div>
        <ul>
            <li><button @click="formStore.handleFormState(true, 'update', task)">Edit</button></li>
            <li><button @click="handleDelete">Trash</button></li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.options-container {
    @apply border border-slate-300 rounded-md py-3 absolute bg-white shadow-md right-0 top-0 w-full;

    .move-to-item {
        @apply flex justify-between px-3 pt-0 pb-3 w-full text-xs border-b border-b-slate-200;
    }

    ul {
        li {
            @apply hover:bg-slate-100 px-4 py-1;

            button {
                @apply w-full text-left;
            }
        }
    }
}
</style>
