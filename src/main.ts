import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// pinia
import pinia from "@/store/index";

// arco-design
import ArcoVue from "@arco-design/web-vue";
// arco-css
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import 'virtual:svg-icons-register'; // 引入虚拟模块注册 SVG 图标

// 引入i18n
import i18n from "@/lang/index";

// vue-router
import router from "@/router/index";

const app = createApp(App);

app.use(ArcoVue, {
  componentPrefix: "arco"
});
app.use(pinia);
// 注册 ArcoVueIcon 为全局组件
Object.keys(ArcoVueIcon).forEach(key => {
  app.component(key, ArcoVueIcon[key]);
});
app.use(router);
app.use(i18n);
app.mount('#app')
