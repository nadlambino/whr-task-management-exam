<script setup>
import {useTrashStore} from "../store/trashStore.js";
import {useMutation, useQuery, useQueryClient} from '@tanstack/vue-query';
import {computed} from "vue";

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
        })
    }
})
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
                    Trash Bin
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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <td colspan="4">Retrieving trashed tasks</td>
                            </tr>
                            <tr v-else-if="!isLoading && tasks.length === 0">
                                <td colspan="4">Trash bin is empty</td>
                            </tr>
                            <tr
                                v-for="task in tasks"
                                :key="task.id"
                            >
                                <td>{{ task.title }}</td>
                                <td>{{ task.status }}</td>
                                <td>{{ task.trashed_at }}</td>
                                <td>
                                    <v-btn
                                        variant="tonal"
                                        class="button main-button"
                                        @click="restoreTrashed(task.id)"
                                        :disabled="isRestoring || isLoading"
                                    >
                                        <v-icon icon="mdi-restore mr-2" />
                                        Restore
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
