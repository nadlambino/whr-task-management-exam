import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('formStore', () => {
    const isOpen = ref(false)
    const formType = ref('create') // create or update

    function handleFormState(value, type = 'create') {
        isOpen.value = value
        formType.value = type
    }

    return {
        isOpen,
        formType,
        handleFormState
    }
})
