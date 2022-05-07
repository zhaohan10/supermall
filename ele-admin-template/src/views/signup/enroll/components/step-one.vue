<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    style="padding-right: 15px"
  >
    <div style="margin-bottom: 20px; padding: 0 20px">
      <el-alert
        title="每人最多选择两个岗位。"
        type="info"
        show-icon
        class="ele-alert-border"
      />
    </div>
    <div v-for="(item, index) in form.positions" :key="item.key">
      <el-row>
        <el-col :md="10" :sm="12">
          <el-form-item label="单位：">
            <template>
              <div style="max-width: 260px">
                <ele-tree-select
                  :data="data"
                  v-model="form.positions[index].company"
                  :clearable="true"
                  placeholder="请选择目标单位"
                  :disabled="false"
                  :default-expand-all="true"
                  :expand-on-click-node="true"
                />
              </div>
            </template>
          </el-form-item>
        </el-col>
        <el-col :md="10" :sm="12">
          <el-form-item label="职位：">
                        <template>
              <div style="max-width: 260px">
                <ele-tree-select
                  :data="data"
                  v-model="form.positions[index].position"
                  :clearable="true"
                  placeholder="请选择职位"
                  :disabled="false"
                  :default-expand-all="true"
                  :expand-on-click-node="true"
                />
              </div>
            </template>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="5">
          &nbsp;&nbsp;<el-button
            v-if="index != 0"
            @click.prevent="removePos(item)"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </div>

    <el-form-item>
      <el-button
        @click="addPos"
        type="primary"
        icon="el-icon-plus"
        circle
        style="float: right; margin-right: 60px"
      ></el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="submit"
        style="float: right; margin-right: 120px"
      >
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import DemoBasic from './demo-basic.vue';
    import treeData from './tree-data';
  export default {
    name: 'StepEdit',
    components: { DemoBasic },
    props:{
      form:Object  
    },
    data() {
      return {
        // 选择框的数据源选项
        data: treeData,
        // 表单数据

        // 表单验证规则
        rules: {

        },
        // 提交状态
        loading: false
      };
    },
        watch: {
      expandOnClickNode() {
        this.value = '';
      }
    },
    methods: {
      // 表单提交
      submit() {
        console.log(this.form.positions)
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$emit('done', this.form);
            }, 300);
          } else {
            return false;
          }
        });
      },
      removePos(item) {
        var index = this.form.positions.indexOf(item);
        if (this.form.number !== 1) {
          this.form.positions.splice(index, 1);
          this.form.number--;
        }
      },
      addPos() {
        if (this.form.number < 2) {
          this.form.positions.push({
            position: '',
            company: '',
            detail:'',
            key: Date.now()
          });
          this.form.number++;
        
        }
      }
    }
  };
</script>

<style scoped>
  .input-with-select ::v-deep .el-select .el-input {
    width: 100px;
  }
</style>
