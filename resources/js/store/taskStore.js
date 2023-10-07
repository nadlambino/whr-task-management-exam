import { defineStore } from 'pinia'
import {ref} from "vue";
import { useQuery } from '@tanstack/vue-query';
import {computed} from "vue";
import {useDebounce} from "@vueuse/core";

export const useTaskStore = defineStore('taskStore', () => {
    const search = ref('')
    const debouncedSearch = useDebounce(search, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['tasks', { debouncedSearch }],
        queryFn: async () => {
            return await Promise.all([
                await window.axios.get(`/api/tasks?status=todo&search=${debouncedSearch.value}`),
                await window.axios.get(`/api/tasks?status=inprogress&search=${debouncedSearch.value}`),
                await window.axios.get(`/api/tasks?status=completed&search=${debouncedSearch.value}`),
            ]);
        }
    })
    const todos = computed(() => {
        return data?.value && data.value[0] ? data.value[0].data.data : []
    })
    const inProgress = computed(() => {
        return data?.value && data.value[1] ? data.value[1].data.data : []
    })
    const completed = computed(() => {
        return data?.value && data.value[2] ? data.value[2].data.data : []
    })

    return {
        search,
        isLoading,
        todos,
        inProgress,
        completed,
    }
})
