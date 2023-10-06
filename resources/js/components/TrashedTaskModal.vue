<script setup>
import {useTrashStore} from "../store/trashStore.js";
import { useQuery } from '@tanstack/vue-query';
import {computed} from "vue";

const { data, isLoading } = useQuery({
    queryKey: ['trashed'],
    queryFn: async () => {
        return await window.axios.get('/api/tasks?is_trashed=1');
    }
})
const tasks = computed(() => data.value?.data?.data ?? [])

const trashStore = useTrashStore()
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
                                <th>
                                    Title
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="task in tasks"
                                :key="task.id"
                            >
                                <td>{{ task.title }}</td>
                                <td>{{ task.status }}</td>
                                <td>
                                    <v-btn variant="tonal" class="button main-button">
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
</style>
