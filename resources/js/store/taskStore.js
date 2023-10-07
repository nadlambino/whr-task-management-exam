import { defineStore } from 'pinia'
import {ref} from "vue";
import { useQuery } from '@tanstack/vue-query';
import {computed} from "vue";
import {useDebounce} from "@vueuse/core";

export const useTaskStore = defineStore('taskStore', () => {
    const search = ref('')
    const sort = ref('');
    const sortDir = ref('');
    const sortText = computed(() => {
        return sortDir.value && sort.value ? `${sort.value?.replace(/_/g, ' ')} (${sortDir.value})` : null
    })

    function handleSortChange(value, direction) {
        sort.value = value
        sortDir.value = direction
    }

    const debouncedSearch = useDebounce(search, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['tasks', { debouncedSearch, sort, sortDir }],
        queryFn: async () => {
            return await Promise.all([
                await window.axios.get(`/api/tasks?status=todo&search=${debouncedSearch.value}&sort=${sort.value}&sort_dir=${sortDir.value}`),
                await window.axios.get(`/api/tasks?status=inprogress&search=${debouncedSearch.value}&sort=${sort.value}&sort_dir=${sortDir.value}`),
                await window.axios.get(`/api/tasks?status=completed&search=${debouncedSearch.value}&sort=${sort.value}&sort_dir=${sortDir.value}`),
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
        sortText,
        isLoading,
        todos,
        inProgress,
        completed,
        handleSortChange
    }
})
