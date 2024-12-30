import axios from "@/api";

export default {
    // 修改菜单状态
    changeMenuStatus(data = {}) {
        return axios({
            url: "/mock/menu/changeStatus",
            method: "put",
            data
        });
    },
    // 获取菜单列表
    getMenuListAPI() {
        return axios({
            url: "http://127.0.0.1:8080/mock/menu/list/",
            method: "get"
        });
    },

    // 更新菜单列表
    upMenuListAPI(data = {}) {
        return axios({
            url: "http://127.0.0.1:8080/mock/menu/list/",
            method: "post",
            data
        });
    },
    // 删除菜单
    delMenuAPI(data = {}) {
        return axios({
            url: "http://127.0.0.1:8080/mock/menu/list/",
            method: "delete",
            data
        });
    },
}
