import { defineStore } from 'pinia'
import {ref} from "vue";

export const useTrashStore = defineStore('trashStore', () => {
    const isOpen = ref(false)

    function handleIsOpen(value) {
        isOpen.value = value
    }

    return {
        isOpen,
        handleIsOpen
    }
})
