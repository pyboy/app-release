<template>
  <div class="app-release-class">
    <div class="container">
      <div class="left-box">
        <div class="box-title">文件库</div>
        <a-divider margin="0" />
        <FileTree class="file-tree-style" @on-node="onNode" />
      </div>
      <div class="right-box">
        <div class="box-title">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item.title }}</a-breadcrumb-item>
            <a-breadcrumb-item v-if="breadcrumb.length == 0">全部</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <a-divider margin="0" />
        <FileTable ref="FileTableRef" class="file-table-style" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileTree from "@/components/file/file-tree.vue";
import FileTable from "@/components/file/file-table.vue";

const FileTableRef = ref();
const breadcrumb = ref<any>([]);
const onNode = (list: any) => {
  breadcrumb.value = list;
  FileTableRef.value && FileTableRef.value.getList();
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  overflow: hidden;
  .left-box {
    width: 300px;
    height: 100%;
    background: $color-bg-1;
    .file-tree-style {
      height: calc(100% - 40px);
    }
  }
  .right-box {
    width: calc(100% - 220px - $padding);
    height: 100%;
    margin-left: $padding;
    background: $color-bg-1;
    .file-table-style {
      height: calc(100% - 40px);
    }
  }
}
.box-title {
  height: 40px;
  padding: 0 $margin;
  font-size: $font-size-title-1;
  line-height: 40px;
  text-align: left;
}
</style>
