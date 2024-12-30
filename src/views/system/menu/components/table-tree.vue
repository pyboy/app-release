<template>
  <div class="container-page">
    <!--  左右布局 输入搜索、展开、收缩  -->
    <a-row :gutter="2">
      <a-col :span="16">
        <a-input class="search-tree" v-model="searchKey" placeholder="请输入搜索关键词">
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-col>
      <a-col :span="4">
        <a-button @click="expandAll">
          <template #default>展开</template>
        </a-button>
      </a-col>
      <a-col :span="4">
        <a-button @click="collapseAll">
          <template #default>收缩</template>
        </a-button>
      </a-col>
    </a-row>
    <div class="tree-box">
      <a-spin class="tree-loading" :loading="loading" tip="加载中...">
        <!-- TODO: 滚动条边距和宽度需要调整 -->
        <a-scrollbar style="height: 100%; overflow: auto" outer-class="scrollbar">
          <a-tree ref="aTreeRef" :data="treeData" :default-expand-all="true" :show-line="true" @select="MenuNode">
            <template #title="node">
              <div class="tree-node-container">
                <span class="tree-title">{{ node.name }}</span>
                <a-button size="mini" class="add-btn" @click.stop="addChild(node)">添加</a-button>
                <a-button size="mini" class="remove-btn" @click.stop="removeNode(node)">删除</a-button>
              </div>
            </template>
            <template #icon="node">
              <SvgIcon name="folder-close" :size="16" v-if="!node.isLeaf && !node.expanded"></SvgIcon>
              <SvgIcon name="folder-open" :size="16" v-if="!node.isLeaf && node.expanded"></SvgIcon>
              <SvgIcon name="txt" :size="16" v-if="node.isLeaf"></SvgIcon>
            </template>
          </a-tree>
        </a-scrollbar>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findParentsTailRecursive } from "@/utils";

// 加载后端访问功能
import MenuApi from "@/api/system/menu.ts"
import { Message } from "@arco-design/web-vue";

const emit = defineEmits(["MenuNode"]);

const MenuNode = (selectedKeys: Array<string>) => {
  let list = findParentsTailRecursive(treeData.value, selectedKeys[0]);
  emit("MenuNode", list);
};

const searchKey = ref<string>("");
const treeData = computed(() => {
  if (!searchKey.value) return sourceTree.value;
  return searchData(searchKey.value);
});

// 展开所有
const expandAll = () => {
  aTreeRef.value.expandAll(true);
}

// 收缩所有
const collapseAll = () => {
  aTreeRef.value.expandAll(false);
}

// 添加子节点
const addChild = (node: SourceTree) => {
  const newNode = {
    name: "首页",
    key: 99999,
    parentId: node.key,
    path: "home/home",
    component: "home/home",
    redirect: "",
    menu_type: "menu",
    meta: {
      keepAlive: false,
      svgIcon: ""
    }
  };
  if (node.children) {
    console.log('Adding child to node:', node);
    node.children.push(newNode);
  } else {
    console.log('Adding child to new node:', node);
    node.children = [newNode];
  }
};

// 删除节点
const removeNode = (node: SourceTree) => {
  console.log('Removing node:', node);
  // 删除 treeData.value 中key 为 node.key 的节点
  removeTreeByKey(treeData.value, node.key)
  // 删除后端数据
  MenuApi.delMenuAPI(node).then((res) => {
    if (res.code == 200) {
      Message.success('删除成功');
    } else {
      Message.error('删除失败');
    }

  })
};

const removeTreeByKey = (tree: SourceTree[], key: number) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      tree.splice(i, 1);
      return;
    }
    if (node.children) {
      removeTreeByKey(node.children, key);
    }
  }
};

// 搜索树
const searchData = (keyword: string) => {
  const loop = (tree: SourceTree[]) => {
    const result: SourceTree[] = []; // 存储搜索结果
    tree.forEach((item: SourceTree) => {
      // 匹配节点
      if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        // 不匹配，但是有children，深层遍历
        // filterData 存储遍历结果
        const filterData = loop(item.children);
        // 如果在深层遍历中，匹配到
        if (filterData.length) {
          // 将结果存储到children中
          result.push({
            ...item,
            children: filterData
          });
        }
      }
    });
    return result;
  };
  // 开始递归
  return loop(sourceTree.value);
};

interface SourceTree {
  name: string;
  type: string;
  key: Number;
  meta: {
    parentId: number;
    keepAlive: boolean;
    svgIcon: string;
  },
  children?: SourceTree[];
}
const aTreeRef = ref();
const loading = ref<boolean>(false);
const sourceTree = ref<From[]>([]);
const getDocumentLibraryTree = async () => {
  try {
    loading.value = true;
    const { data } = await MenuApi.getMenuListAPI();
    loading.value = false;
    sourceTree.value = data;
    nextTick(() => {
      aTreeRef.value.expandAll(true);
    });
  } finally {
    loading.value = false;
  }
};
getDocumentLibraryTree();
</script>

<style lang="scss" scoped>
.container-page {
  box-sizing: border-box;
  height: 100%;
  padding: $padding;
  .search-tree {
    height: 32px;
    margin-bottom: $margin;
  }
  .tree-box {
    height: calc(100% - 32px - $margin);
    .tree-loading {
      width: 100%;
      height: 100%;
    }
    .scrollbar {
      height: 100%;
      width: 100%;
      .tree-node-container {
        display: flex; // 使用 flex 布局
        width: 100%;
        align-items: center; // 垂直居中对齐
        justify-content: space-between; // 在项目之间分配空间
      }
      .tree-title {
        flex-grow: 1; // 让标题占满剩余空间
        text-align: left; // 确保标题左对齐
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .add-btn, .remove-btn {
        padding: 4px;
        min-width: 20px;
        margin-left: 14px; // 按钮之间的间距
      }
      .add-btn {
        margin-left: 46px; // 第一个按钮不需要左边距
      }
    }
  }
}
</style>
