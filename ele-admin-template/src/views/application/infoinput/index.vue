<template>
  <div>
    <div
      class="ele-page-header"
      style="position: fixed; width: 100%; opacity: 1; z-index: 999"
    >
      <div class="ele-page-title"
        ><h5 style="font-weight: bold">请示信息录入</h5></div
      >
    </div>
    <div style="height: 50px"></div>
    <div class="ele-body" style="padding-bottom: 71px">
      <!--  @keyup.enter.native="submit"为监听键盘回车事件；@submit.native.prevent表示提交以后不刷新页面 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="160px"
        @keyup.enter.native="submit"
        @submit.native.prevent
      >
        <el-card shadow="never" body-style="padding: 22px 22px 0 22px;">
          <h6 style="font-weight: bold">机构设置及人员配置</h6><br /><br />
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="单位名称:" prop="company">
                <el-input
                  v-model="form.company"
                  placeholder="请输入单位名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="职能部门(个):" prop="funDept">
                <el-input
                  v-model="form.funDept"
                  placeholder="职能部门个数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="业务部门(个):" prop="busDept">
                <el-input
                  v-model="form.busDept"
                  placeholder="业务部门个数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="人员编制总量:" prop="totalStaffing">
                <el-input
                  v-model="form.totalStaffing"
                  placeholder="人员编制总量"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="领导班子人数:" prop="leaderNum">
                <el-input
                  v-model="form.leaderNum"
                  placeholder="领导班子人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="综合管理部人数:" prop="managementNum">
                <el-input
                  v-model="form.managementNum"
                  placeholder="综合管理部人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="财务部人数:" prop="financeNum">
                <el-input
                  v-model="form.financeNum"
                  placeholder="财务部人数"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <!-- 当前人员配置 -->
          <h6 style="font-weight: bold">当前人员配置</h6><br /><br />
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="人员总量:" prop="totalReal">
                <el-input
                  v-model="form.totalReal"
                  placeholder="请输入人员总量"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="领导班子人数:" prop="leaderReal">
                <el-input
                  v-model="form.leaderReal"
                  placeholder="领导班子人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="领导班子缺编人数:" prop="leaderLack">
                <el-input
                  v-model="form.leaderLack"
                  placeholder="领导班子缺编人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="综合管理部人数:" prop="managementReal">
                <el-input
                  v-model="form.managementReal"
                  placeholder="综合管理部人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="综合管理部缺编人数:" prop="managementLack">
                <el-input
                  v-model="form.managementLack"
                  placeholder="综合管理部缺编人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="财务部人数:" prop="financeRel">
                <el-input
                  v-model="form.financeRel"
                  placeholder="财务部人数"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12">
              <el-form-item label="财务部缺编人数:" prop="financeLack">
                <el-input
                  v-model="form.financeLack"
                  placeholder="财务部缺编人数"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <!-- 需求原因 -->
          <h6 style="font-weight: bold">需求原因</h6><br /><br />
          <el-form-item
            v-for="(domain, index) in form.domains"
            :label="index + 1 + '.'"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '需求原因不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="domain.value"
              style="width: 70%"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 7 }"
            ></el-input
            >&nbsp;&nbsp;&nbsp;
            <el-button
              v-if="index != 0"
              @click.prevent="removeDomain(domain)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addDomain"
              type="primary"
              icon="el-icon-plus"
              circle
              style="float: right; margin-right: 60px"
            ></el-button>
          </el-form-item>
          <el-divider></el-divider>
          <!-- 需求岗位 -->
          <h6 style="font-weight: bold">需求岗位</h6><br /><br />
          <el-form-item
            v-for="(item, index) in form.positions"
            :label="'职位' + (index + 1) + '.'"
            :key="item.key"
            :rules="{
              required: true,
              message: '需求岗位不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="item.position"
              style="width: 30%"
              placeholder="需求岗位"
              clearable
            ></el-input
            >&nbsp;&nbsp;&nbsp;
            <el-input
              v-model="item.number"
              style="width: 30%"
              placeholder="该岗位需求人数"
              clearable
            ></el-input
            >&nbsp;&nbsp;&nbsp;
            <el-button
              v-if="index != 0"
              @click.prevent="removePos(item)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addPos"
              type="primary"
              icon="el-icon-plus"
              circle
              style="float: right; margin-right: 60px"
            ></el-button>
          </el-form-item>
          <el-divider></el-divider>
          <h6 style="font-weight: bold">附件上传</h6><br /><br />
          <div class="fileUpload">
            <el-upload
              ref="uploadplan"
              class="upload-demo"
              action=""
              accept=".doc, .docx"
              :on-remove="handleRemove"
              :http-request="uploadHttpRequest"
              :limit="1"
              :file-list="fileList"
            >
              <p style="float: left; margin-left: 40px"
                >请上传竞聘岗位及任职资格条件(doc/docx格式)</p
              >
              <el-button
                type="primary"
                size="small"
                style="float: left; margin-left: 20px"
              >
                点击上传
              </el-button>
            </el-upload>
            <div style="height: 30px"></div>
          </div>
        </el-card>
        <!-- 底部工具栏 -->
        <div class="ele-bottom-tool">
          <div class="ele-bottom-tool-actions">
            <el-button type="primary" :loading="loading" @click="submit">
              提交
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import UserSelect from './components/user-select.vue';

  export default {
    name: 'infoinput',
    // components: { UserSelect },
    data() {
      return {
        fileList: [], //上传的文件列表

        // 表单提交状态
        loading: false,
        // 表单数据
        form: {
          company: '',
          funDept: '',
          busDept: '',
          totalStaffing: '',
          leaderNum: '',
          managementNum: '',
          financeNum: '',
          totalReal: '',
          leaderReal: '',
          leaderLack: '',
          managementReal: '',
          managementLack: '',
          financeRel: '',
          financeLack: '',
          domains: [
            {
              value: ''
            }
          ],
          positions: [
            {
              position: '',
              number: ''
            }
          ]
        },
        textarea: '',
        // 表单验证规则
        rules: {
          company: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          funDept: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          busDept: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          totalStaffing: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          leaderNum: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          managementNum: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          financeNum: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          totalReal: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          leaderReal: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          leaderLack: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          managementReal: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          managementLack: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          financeRel: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          financeLack: [
            {
              required: true,
              message: '该项不能为空',
              trigger: 'blur'
            }
          ],
          positions: [
            {
              required: true,
              message: '该项不能为空yyyyy',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    methods: {
      //自定义上传方法
      uploadHttpRequest(param) {
        console.log(param.file);
        //查看是否选取到文件
      },
      //  文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        this.$message.warning('文件已移除');
      },
      /* 表单提交 */
      submit() {
        // 结合prop进行表单校验
        this.$refs['form'].validate((valid, obj) => {
          if (valid) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$message.success('提交成功');
              console.log(this.form);
            }, 1500);
          } else {
            return false;
          }
        });
      },
      removeDomain(item) {
        var index = this.form.domains.indexOf(item);
        if (index !== -1) {
          this.form.domains.splice(index, 1);
        }
      },
      addDomain() {
        this.form.domains.push({
          value: '',
          key: Date.now()
        });
      },
      removePos(item) {
        var index = this.form.positions.indexOf(item);
        if (index !== -1) {
          this.form.positions.splice(index, 1);
        }
      },
      addPos() {
        this.form.positions.push({
          position: '',
          number: '',
          key: Date.now()
        });
      }
    }
  };
</script>

<style scoped>
  .el-divider {
    margin: 20px 0;
    padding: 1px;
    color: rgba(168, 12, 12, 0.8) !important;
    color: rgba(red, green, blue, alpha);
  }
</style>
