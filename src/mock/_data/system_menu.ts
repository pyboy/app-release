/**
 * 路由path路径与文件夹名称相同，找文件可以浏览器地址快速查找，方便定位文件
 *
 * component
 * 模块加载路径，除了layout外，全部默认路径为src/views文件夹内的文件
 * 不要以"/"开头，结尾不要带文件扩展名，如:".vue"
 * 举例：views文件夹下的home文件夹下的home.vue
 * component: "home/home"
 *
 *
 * 路由meta对象参数，我们通常将属性放到meta对象中
 * meta: {
 * title:       菜单栏以及 tabsView 栏、菜单搜索名称（国际化）
 * hide:        是否隐藏此路由，不会显示在菜单树，可以访问
 * disable:     是否停用，不会显示在菜单树，且不可访问
 * keepAlive:   是否缓存组件状态
 * affix:       是否固定在 tabsView 栏上
 * link:        是否是超链接菜单，开启外链条件：1、 link：链接地址不为空  2、iframe: false
 * iframe:      是否内嵌窗口，开启条件：1、iframe：true  2、link：链接地址不为空
 * roles:       当前路由权限表示，取角色管理。路由控制显示、隐藏。 超级管理员：admin；普通角色：common
 * icon:        菜单、tabsView 图标等
 * svgIcon:     svg图标
 * sort:        菜单顺序
 * }
 */

/**
 * 路由的层级设置
 * layout为框架布局，顶层路由
 * layout.children下的路由为menu菜单，例如：首页、系统设置、权限管理，在这里我称它为"一级路由"
 * 一级路由下的children则是当前菜单的二级菜单
 * 依此类推
 */
export default [
  {
    path: "/",
    name: "/",
    key: 1,
    menu_type: "menu",
    redirect: "/home",
    component: "layout", // 容器布局-顶层路由
    meta: {
      keepAlive: true
    },
    // 二级路由-主要渲染页面
    children: [
      {
        path: "/home",
        name: "/home",
        key: 2,
        menu_type: "menu",
        component: "home/home",
        meta: {
          title: "首页", // 国际化
          hide: false, // 是否隐藏此路由
          disable: false, // 是否停用此路由
          keepAlive: false, // 缓存组件状态
          affix: true, // 固定在tagesView栏上
          link: "", // 是否外链
          iframe: false, // 是否内嵌窗口
          roles: ["admin", "common"], // 路由权限
          svgIcon: "home", // 菜单图标
          sort: 1
        }
      },
      {
        path: "/file",
        name: "/file",
        key: 3,
        menu_type: "menu",
        redirect: "/file/file",
        meta: {
          title: "文件管理",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "folder-menu",
          sort: 2
        },
        children: [
          {
            path: "/file/file",
            name: "/file/file",
            menu_type: "menu",
            key: 4,
            component: "file/file/file",
            meta: {
              title: "文件列表",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              svgIcon: "more",
              sort: 1
            }
          }
        ]
      },
      {
        path: "/system",
        name: "/system",
        key: 5,
        menu_type: "menu",
        redirect: "/system/menu",
        meta: {
          title: "系统",
          hide: false,
          disable: false,
          keepAlive: true,
          affix: false,
          link: "",
          iframe: false,
          roles: ["admin"],
          svgIcon: "set",
          sort: 9
        },
        children: [
          {
            path: "/system/menu",
            name: "/system/menu",
            menu_type: "menu",
            key: 6,
            component: "system/menu/menu",
            meta: {
              title: "菜单列表",
              hide: false,
              disable: false,
              keepAlive: true,
              affix: false,
              link: "",
              iframe: false,
              roles: ["admin"],
              svgIcon: "more",
              sort: 3
            },
            buttons: [
              {
                type: "button",
                name: "add",
              }
            ]
          }
        ]
      }
    ]
  }
];
