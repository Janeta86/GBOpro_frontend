import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from '@/store/store.js'
import { MaskInput } from 'vue-3-mask';

const app = createApp(App);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    router.push('/login');
  }
  return Promise.reject(error);
});

app.component('MaskInput', MaskInput);
app.use(router);
app.use(store);
app.mount('#app');


