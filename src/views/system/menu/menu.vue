<template>
  <div class="app-release-class">
    <div class="container">
      <div class="left-box">
        <div class="box-title">权限菜单</div>
        <a-divider margin="0" />
        <TableTree ref="TableTreeRef" class="from-tree-style" @menu-node="MenuNode" />
      </div>
      <div class="right-box">
        <div class="box-title">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item.name }}</a-breadcrumb-item>
            <a-breadcrumb-item v-if="breadcrumb.length == 0">菜单</a-breadcrumb-item>
          </a-breadcrumb>
          <a-button type="primary" status="success" class="from-right" @click="saveMenu">
            <template #default>保存</template>
          </a-button>
        </div>
        <a-divider margin="0" />
        <TableFrom ref="TableFormRef" class="table-from-style" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableTree from "./components/table-tree.vue";
import TableFrom from "./components/from.vue";

const TableFormRef = ref();
const breadcrumb = ref<any>([]);

const MenuNode = (list: any) => {

  breadcrumb.value = list;
  const jsonData = list[list.length - 1]
  TableFormRef.value &&
  TableFormRef.value.getMenuData(jsonData);

};

const saveMenu = () => {
  TableFormRef.value &&
  TableFormRef.value.sendMenuData();
};

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  overflow: hidden;
  .left-box {
    width: 500px;
    height: 100%;
    background: $color-bg-1;
    .from-tree-style {
      height: calc(100% - 40px);
    }
  }
  .right-box {
    width: calc(100% - 220px - $padding);
    height: 100%;
    margin-left: $padding;
    background: $color-bg-1;
    .table-from-style {
      height: calc(100% - 40px);
    }
  }
}
.from-right {
  float: right;
  margin-top: 5px;
}
.box-title {
  height: 40px;
  padding: 0 $margin;
  font-size: $font-size-title-1;
  line-height: 40px;
  text-align: left;
}
</style>
