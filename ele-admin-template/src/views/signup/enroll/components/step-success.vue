<template>
  <div style="padding: 0 15px">
    <ele-result title="操作成功">
      <p style="text-align:center">报名已完成！</p>
      <template slot="actions">
        <el-button type="primary" @click="detail">点击查看</el-button>
      </template>
    </ele-result>
  </div>
</template>

<script>
  export default {
    name: 'StepSuccess',
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      detail() {
        this.$router.push('/signup/list')
      }
    }
  };
</script>
