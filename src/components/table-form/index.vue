<template>
  <div class="container-page">
    <div class="arco-page-header-header-left">
      <a-form
          ref="TablesForm"
          size="medium"
          :model="form"
      >
        <!--   左右布局 菜单名称 菜单标识 距离顶部5px     -->
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="菜单名称" prop="name">
              <a-input v-model:value="form.name" placeholder="请输入菜单名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单标识" prop="code">
              <a-input v-model:value="form.code" placeholder="请输入菜单标识" />
            </a-form-item>
          </a-col>
        </a-row>

        <!--   左右布局 上级菜单 菜单类型     -->
        <a-row :gutter="16" style="margin-top: 10px">
          <a-col :span="12">
            <a-form-item label="上级菜单" prop="parentId">
              <a-select
                  v-model:value="form.parentId"
                  placeholder="请选择上级菜单"
                  style="width: 100%"
              >
                <a-select-option value="1">菜单1</a-select-option>
                <a-select-option value="2">菜单2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单类型" prop="type">
              <a-select
                  v-model:value="form.type"
                  placeholder="请选择菜单类型"
                  style="width: 100%"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">

// 定义form 类型
import {Form} from "./config.ts";
const form = ref<Form>({ name: "" });

const getList = async () => {

}
getList();
</script>
<style scoped lang="scss">

</style>