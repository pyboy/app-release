
interface From {
  name: string;
  menu_type: string;
  code: string;
  id: number; // 将 key 类型改为 number
  path: string;
  permission: string;
  meta: {
    svgicon: string;
    title: "";
    affix: boolean;
    hidden: boolean;
    keepAlive: boolean;
    hide: boolean;
  };
  children: From[];
  component: string;
  parentId: number;
}
