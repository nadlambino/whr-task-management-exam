<script setup>
import {ref, watchEffect} from "vue";
import { useFormStore } from "../store/formStore.js";

const formStore = useFormStore()
</script>

<template>
    <v-row justify="center">
        <v-dialog
            v-model="formStore.isOpen"
            :persistent="true"
            width="768"
            max-width="100%"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5 text-capitalize">
                        {{ formStore.formType }} Task
                    </span>
                </v-card-title>
                <form>
                    <v-card-text>
                        <v-text-field
                            label="Title"
                            variant="outlined"
                            v-model="formStore.title"
                            required
                        />
                        <v-textarea
                            label="Description"
                            variant="outlined"
                            max-rows="8"
                            v-model="formStore.description"
                            required
                        />
                        <v-label>Status</v-label>
                        <v-container class="flex gap-3">
                            <div class="flex gap-1">
                                <input type="radio" id="todo" value="todo" v-model="formStore.status" name="status" />
                                <label for="todo">Todo</label>
                            </div>
                            <div class="flex gap-1">
                                <input type="radio" id="inprogress" value="inprogress" v-model="formStore.status" name="status" />
                                <label for="inprogress">In Progress</label>
                            </div>
                            <div class="flex gap-1">
                                <input type="radio" id="completed" value="completed" v-model="formStore.status" name="status" />
                                <label for="completed">Completed</label>
                            </div>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="button secondary-button"
                            variant="tonal"
                            @click="formStore.handleFormState(false)"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            class="button main-button"
                            variant="tonal"
                            @click="formStore.handleFormState(false)"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";
</style>
