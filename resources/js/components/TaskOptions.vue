<script setup>

import {ref} from "vue";

const statuses = [
    {key: 'Todo', value: 'todo'},
    {key: 'In Progress', value: 'inprogress'},
    {key: 'Completed', value: 'completed'},
];
const status = ref();
function handleChangeStatus(item) {
    status.value = item
}
</script>

<template>
    <div class="options-container">
        <div class="move-to-item">
            <v-btn
                id="menu-activator"
                variant="tonal"
                class="button main-button h-7 text-left uppercase"
                width="100%"
            >
                MOVE TO {{ status?.key }}
            </v-btn>
            <v-menu activator="#menu-activator">
                <v-list>
                    <v-list-item
                        v-for="(item) in statuses"
                        :key="item.key"
                        :value="item.value"
                        @click="handleChangeStatus(item)"
                    >
                        <v-list-item-title>{{ item.key }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <ul>
            <li><button>Edit</button></li>
            <li><button>Delete</button></li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import "./../../css/app.css";

.options-container {
    @apply border border-slate-300 rounded-md py-3 absolute bg-white shadow-md right-0 top-0 w-52;

    .move-to-item {
        @apply flex justify-between p-2 pt-0 w-full text-xs;
    }

    ul {
        li {
            @apply hover:bg-slate-100 px-2 py-1;

            button {
                @apply w-full text-left;
            }
        }
    }
}
</style>
