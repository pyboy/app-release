<template>
  <div class="container-page">
    <div class="arco-page-header-header-left">
      <a-form
          ref="TableFormRef"
          size="medium"
          :model="from"
      >
        <!--   左右布局 菜单名称 菜单标识 距离顶部5px     -->
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空' }]">
              <a-input v-model="from.name" placeholder="请输入菜单名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="标识" prop="key" :rules="[{ type: 'number', min: 1, message: '最小为1' }]">
              <a-input-number v-model="from.key" placeholder="自动生成菜单标识，无需填写" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <!--   左右布局 web路径 组件 距离顶部5px     -->
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="访问路径" prop="web_path" >
              <a-input v-model="from.path" placeholder="访问路径" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组件" prop="component">
              <a-input v-model="from.component" placeholder="文件路径" />
            </a-form-item>
          </a-col>
        </a-row>
        <!--   左右布局 重定向  距离顶部5px     -->
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="重定向" prop="web_path" >
              <a-input v-model="from.redirect" placeholder="访问路径" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型" prop="type" :rules="[{ required: true, message: '类型不能为空' }]">
              <a-radio-group
                  v-model="from.menu_type"
                  type="button"
              >
                <a-radio value="menu">菜单</a-radio>
                <a-radio value="button">按钮</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="权限标识" prop="permission">
              <a-input v-model="from.permission" placeholder="图标" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图标" prop="svgIcon">
              <a-input v-model="from.meta.svgIcon" placeholder="图标" />
            </a-form-item>
          </a-col>
        </a-row>
        <!--   4列布局 元数据 菜单类型     -->
        <a-row :gutter="16" style="margin-top: 10px; margin-left: 5px">
          <a-col :span="2">
            <a-form-item field="meta.hide" label="隐藏" label-col-flex="100%">
              <a-switch v-model="from.meta.hide" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="meta.disable" label="停用" label-col-flex="100%">
              <a-switch v-model="from.meta.disable" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="meta.keepAlive" label="缓存" label-col-flex="100%">
              <a-switch v-model="from.meta.keepAlive" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="meta.affix" label="固定" label-col-flex="100%">
              <a-switch v-model="from.meta.affix" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-table
            :columns="buttons_cloumns"
            :data="from.buttons"
            :scroll="{ y:  150 }"
        >
          <template #name="{ record }">
            <a-input v-model="record.name" placeholder="请输入菜单名称" />
          </template>
          <template #type="{ record }">
            <a-input v-model="record.type" placeholder="请输入菜单名称" />
          </template>
          <template #optional="{ index }">
            <a-space>
              <a-button size="mini" @click="addButtons">增加</a-button>
              <a-popconfirm content="确定删除这个按钮吗?" type="warning" @ok="() => delButton(index)">
                <a-button size="mini" type="primary" status="danger">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">

// 定义form 类型
import {From} from "./config.ts";

const from = ref<From>({
  name: '',
  key: 1,
  path: "",
  redirect: "",
  parentId: 1,
  menu_type: "menu",
  component: "",
  meta: {
    title: "",
    svgIcon: "",
    hide: false,
    disable: false,
    keepAlive: true,
    affix: false
  },
  buttons: []
});

const addButtons = () => {
  from.value.buttons.push({
    name: "按钮",
    type: "button",
    permission: "button"
  })
}

const delButton = (index) => {

  if (from.value.buttons.length == 1) {
    from.value.buttons = []
  } else {
    from.value.buttons.splice(index, 1);
  }
}


const buttons_cloumns = [
  {
    title: "按钮名称",
    slotName: "name",
    dataIndex: "name"
  },
  {
    title: "按钮标识",
    slotName: "type",
    dataIndex: "type"
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center"
  }
]

const getMenuData = async (data: From, parentId: number) => {
  // 假设这里有一些逻辑来获取数据
  console.log("getList", data);
  // 填充数据到from
  const dataList = {...data};
  // 将类型是menu的数据填充到menuList
  from.value.parentId = parentId;
  // 获取最后一条数据
  from.value = dataList;
  console.log("from", dataList)
}

// 加载后端访问功能
import MenuApi from "@/api/system/menu.ts"

const sendMenuData = async () => {
  // 假设这里有一些逻辑来获取数据
  console.log("sendList", from.value);
  MenuApi.upMenuListAPI(from.value)
}



defineExpose({
  getMenuData,
  sendMenuData
});
</script>
<style scoped lang="scss">

</style>