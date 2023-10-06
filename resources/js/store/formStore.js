import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export const useFormStore = defineStore('formStore', () => {
    const isOpen = ref(false)
    const formType = ref('create') // create or update

    function handleFormState(value, type = 'create') {
        isOpen.value = value
        formType.value = type
    }

    const title = ref("");
    const description = ref("");
    const status = ref('todo');

    const queryClient = useQueryClient()

    const {
        mutate: createNewTask,
        isSuccess: isTaskCreated,
        isLoading: isTaskCreating,
        isError: isCreateError
    } = useMutation({
        mutationFn: async () => {
            return await window.axios.post('/api/tasks', {
                title: title.value,
                description: description.value,
                status: status.value
            }).then(() => {
                title.value = '';
                description.value = '';
                status.value = 'todo';
                handleFormState(false);
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
            })
        }
    })
    const isFormSubmitting = computed(() => isTaskCreating.value)

    function handleFormSubmit() {
        if (formType.value === 'create') {
            createNewTask();
        }
    }

    return {
        isOpen,
        formType,
        handleFormState,
        title,
        description,
        status,
        handleFormSubmit,
        isFormSubmitting
    }
})
