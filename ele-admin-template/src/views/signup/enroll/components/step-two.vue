<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    class="ele-form-detail"
  >
    <div style="margin-bottom: 20px; padding: 0 20px">
      <el-alert
        title="请如实填写信息并上传所需文件。"
        type="info"
        show-icon
        class="ele-alert-border"
      />
    </div>
    <info-table v-bind="$attrs"></info-table>

    <div style="margin: 20px 0 30px 0">
      <el-divider />
    </div>

    <el-form-item style="float: right; margin-right: 80px">
      <el-button type="primary" :loading="loading" @click="submit">
        下一步
      </el-button>
      <el-button class="hidden-xs-only" @click="back">上一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import infoTable from './infoTable.vue';
  export default {
    name: 'StepConfirm',
    components: { infoTable },
    props: {
      data: {
        type: Object,
        required: true,
              detail:Object
      },
    },

    data() {
      return {
        // 表单数据
        form: {
          password: '123456'
        },
        // 表单验证规则
        rules: {
          password: [
            {
              required: true,
              message: '请输入支付密码',
              trigger: 'blur'
            }
          ]
        },
        // 表单提交状态
        loading: false
      };
    },
    methods: {
      // 表单提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$emit('done');
            }, 300);
          } else {
            return false;
          }
        });
      },
      back() {
        this.$emit('back');
      }
    }
  };
</script>
<style scoped>
</style>
