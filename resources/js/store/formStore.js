import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify';

export const useFormStore = defineStore('formStore', () => {
    const isOpen = ref(false)
    const formType = ref('create') // create or update or delete
    const id = ref();
    const title = ref("");
    const description = ref("");
    const status = ref('todo');

    function handleFormState(value, type = 'create', data = undefined) {
        isOpen.value = value
        formType.value = type

        if ((type === 'update' || type === 'delete') && data) {
            id.value = data.id
            title.value = data.title
            description.value = data.description
            status.value = data.status
        } else if (value === false) {
            id.value = undefined
            title.value = ''
            description.value = ''
            status.value = 'todo'
        }
    }

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
                handleFormState(false);
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
                toast("Successfully Created", {
                    autoClose: 1000,
                    type: 'success'
                });
            })
        },
        onError: () => {
            toast("Create Failed", {
                autoClose: 1000,
                type: 'error'
            });
        }
    })

    const {
        mutate: updateTask,
        isSuccess: isTaskUpdated,
        isLoading: isTaskUpdating,
        isError: isUpdateError
    } = useMutation({
        mutationFn: async () => {
            return await window.axios.put(`/api/tasks/${id.value}`, {
                title: title.value,
                description: description.value,
                status: status.value
            }).then(() => {
                handleFormState(false);
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
                toast("Successfully Updated", {
                    autoClose: 1000,
                    type: 'success'
                });
            })
        },
        onError: () => {
            toast("Update Failed", {
                autoClose: 1000,
                type: 'error'
            });
        }
    })

    const {
        mutate: deleteTask,
        isSuccess: isTaskDeleted,
        isLoading: isTaskDeleting,
        isError: isDeleteError
    } = useMutation({
        mutationFn: async () => {
            return await window.axios.delete(`/api/tasks/${id.value}`).then(() => {
                handleFormState(false);
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
                queryClient.invalidateQueries({ queryKey: ['trashed'] })
                toast("Successfully Deleted", {
                    autoClose: 1000,
                    type: 'success'
                });
            })
        },
        onError: () => {
            toast("Delete Failed", {
                autoClose: 1000,
                type: 'error'
            });
        }
    })

    const isFormSubmitting = computed(() => isTaskCreating.value || isTaskUpdating.value)

    function handleFormSubmit() {
        if (formType.value === 'create') {
            createNewTask();
        } else if (formType.value === 'update') {
            updateTask();
        } else {
            deleteTask();
        }
    }

    return {
        isOpen,
        formType,
        handleFormState,
        id,
        title,
        description,
        status,
        handleFormSubmit,
        isFormSubmitting
    }
})
