/// <reference types="vite/client" />
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "@arco-design/*";
declare module "mockjs";
declare module "sortablejs";
declare module "nprogress";
declare module "@/store/modules/route-config";