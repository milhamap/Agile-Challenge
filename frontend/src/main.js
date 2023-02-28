import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import router from './router'

import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)

app.use(router);
app.use(VueCookies);
app.mount('#app')