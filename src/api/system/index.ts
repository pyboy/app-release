import axios from "@/api";

// 获取菜单数据
export const getMenuListAPI = () => {
  return axios({
    url: "/mock/menu/list",
    method: "get"
  });
};

/**
 * 更改菜单状态
 * @returns
 */
export const changeMenuStatus = (data: any) => {
  return axios({
    url: '/mock/menu/changeStatus',
    method: 'put',
    data
  })
};



