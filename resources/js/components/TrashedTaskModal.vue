<script setup>
import {useTrashStore} from "../store/trashStore.js";
import {useMutation, useQuery, useQueryClient} from '@tanstack/vue-query';
import {computed} from "vue";
import moment from 'moment'
import {toast} from "vue3-toastify";

const trashStore = useTrashStore()
const queryClient = useQueryClient()
const { data, isLoading } = useQuery({
    queryKey: ['trashed'],
    queryFn: async () => {
        return await window.axios.get('/api/tasks?is_trashed=1');
    }
})
const tasks = computed(() => data.value?.data?.data ?? [])

const { mutate: restoreTrashed, isLoading: isRestoring } = useMutation({
    mutationFn: async (id) => {
        await window.axios.put(`/api/tasks/restore/${id}`).then(() => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['trashed'] })
            toast("Successfully Restored", {
                autoClose: 1000,
                type: 'success'
            });
        })
    },
    onError: () => {
        toast("Restore Failed", {
            autoClose: 1000,
            type: 'error'
        });
    }
})

const { mutate: deleterPermanent, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
        await window.axios.delete(`/api/tasks/permanent/${id}`).then(() => {
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

function computeDayDifference(trashedDate) {
    const today = moment()
    const trashed = moment(trashedDate)

    return today.diff(trashed, 'days')
}
</script>

<template>
    <v-dialog
        v-model="trashStore.isOpen"
        :persistent="true"
        width="768"
        max-width="100%"
    >
        <v-card>
            <v-card-title>
                <span class="text-h5 text-capitalize">
                    Trash
                </span>
            </v-card-title>
                <v-card-text>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-center">
                                    Title
                                </th>
                                <th class="text-center">
                                    Status
                                </th>
                                <th class="text-center">
                                    Trashed At
                                </th>
                                <th class="text-center">
                                    Days In Trash
                                </th>
                                <th class="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <td colspan="5">Retrieving trashed tasks</td>
                            </tr>
                            <tr v-else-if="!isLoading && tasks.length === 0">
                                <td colspan="5">Trash bin is empty</td>
                            </tr>
                            <tr
                                v-for="task in tasks"
                                :key="task.id"
                            >
                                <td class="py-2">{{ task.title }}</td>
                                <td class="py-2">{{ task.status }}</td>
                                <td class="py-2">{{ task.trashed_at }}</td>
                                <td class="py-2">{{ computeDayDifference(task.trashed_at) }}</td>
                                <td class="flex gap-1 py-2">
                                    <v-btn
                                        variant="tonal"
                                        class="button main-button"
                                        @click="restoreTrashed(task.id)"
                                        :disabled="isRestoring || isLoading || isDeleting"
                                    >
                                        <v-icon icon="mdi-restore mr-2" />
                                        Restore
                                    </v-btn>
                                    <v-btn
                                        variant="tonal"
                                        class="button danger-button"
                                        @click="deleterPermanent(task.id)"
                                        :disabled="isRestoring || isLoading || isDeleting"
                                    >
                                        <v-icon icon="mdi-delete-alert-outline mr-2" />
                                        Delete
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="button secondary-button"
                        variant="tonal"
                        @click="trashStore.handleIsOpen(false)"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

:deep(table) {
    @apply text-center;
}
</style>
