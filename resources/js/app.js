/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "@tanstack/vue-query";

const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()
const app = createApp({});

app.use(pinia);
app.use(vuetify);
app.use(VueQueryPlugin)

import App from './App.vue';

app.component('app', App);

app.mount('#app');
