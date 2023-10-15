import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import store from "./components/store";
import axios from 'axios'

const app = createApp(App);
app.use(store);
app.mount("#app");


app.config.globalProperties.axios=axios

