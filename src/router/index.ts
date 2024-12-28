import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes, notFoundAndNoPower } from "@/router/route.ts";
import NProgress from "@/config/nprogress";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { useRoutesConfigStore } from "@/store/modules/route-config";
import { useUserInfoStore } from "@/store/modules/user-info";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { loadingPage } from "@/utils/loading-page";
import { currentlyRoute } from "@/router/route-output";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...notFoundAndNoPower]
});

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  const store = useUserInfoStore(pinia);
  const { token } = storeToRefs(store);
  // next()内部加了path等于跳转指定路由会再次触发router.beforeEach，内部无参数等于放行，不会触发router.beforeEach
  if (to.path === "/login" && !token.value) {
    // 1、去登录页，无token，放行
    next();
  } else if (!token.value) {
    // 2、没有token，直接重定向到登录页
    next("/login");
  } else if (to.path === "/login" && token.value) {
    // 3、去登录页，有token，直接重定向到home页
    next("/home");
    // 项目内的跳转，处理跳转路由高亮
    currentlyRoute(to.name as string);
  } else {
    // 4、去非登录页，有token，校验是否动态添加过路由，添加过则放行，未添加则执行路由初始化
    const routeStore = useRoutesConfigStore(pinia);
    const { routeTree } = storeToRefs(routeStore);

    // 获取外链路由的处理函数
    // 所有的路由正常放行，只不过额外判断是否是外链，如果是，则打开新窗口跳转外链
    // 外链的页面依旧正常打开，只不过不会参与缓存与tabs显示，符合路由跳转的直觉
    const { openExternalLinks } = useRoutingMethod();

    // 如果缓存的路由是0，则说明未动态添加路由，先添加再跳转
    // 解决刷新页面404的问题
    if (routeTree.value.length == 0) {
      loadingPage.start();
      await routeStore.initSetRouter();
      // 处理外链跳转
      openExternalLinks(to);
      // 处理完重新跳转
      next({ path: to.path, query: to.query });
    } else {
      // 处理外链跳转
      openExternalLinks(to);
      // 动态路由添加过走这里，直接放行
      next();
      // 项目内的跳转，处理跳转路由高亮
      currentlyRoute(to.name as string);
    }
  }
});

// 路由跳转错误
router.onError((error: any) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});

export default router;