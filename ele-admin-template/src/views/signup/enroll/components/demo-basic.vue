<template>
    <div style="max-width: 260px">
      <ele-tree-select
        :data="data"
        v-model="company"
        :clearable="true"
        placeholder="请选择"
        :disabled="false"
        :default-expand-all="true"
        :expand-on-click-node="true"
      />
    </div>
</template>

<script>
  import treeData from './tree-data';

  export default {
    name: 'DemoBasic',
    data() {
      return {
        // 单选
        company: undefined,
        // 数据
        data: treeData
      };
    },
    watch: {
      expandOnClickNode() {
        this.value = '';
      }
    }
  };
</script>
