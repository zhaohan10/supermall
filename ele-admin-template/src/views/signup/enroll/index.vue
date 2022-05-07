<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">竞聘报名</div>
    </div>
    <div class="ele-body">
      <el-card shadow="never" body-style="padding: 15px 0 25px 0;">
        <div style="max-width: 700px; margin: 0 auto">
          <el-steps
            :active="active"
            class="ele-steps-horizontal"
            style="margin: 10px 0 45px 0"
          >
            <el-step title="第一步" description="选择岗位信息" />
            <el-step title="第二步" description="填写报名信息" />
            <el-step title="第三步" description="报名成功" />
          </el-steps>
          <!-- 第一步 -->
          <step-one v-if="active === 0" @done="onDone" :form="form" />
          <!-- 第二步 -->
          <step-two
            v-if="active === 1"
            :data="form"
            @done="onNext"
            @back="onBack"
            :detail = "form.positions[0]"
          />
            <step-two
            v-if="active === 1 && form.number == 2"
            :data="form"
            @done="onNext"
            @back="onBack"
            :detail = "form.positions[1]"
          />
          <!-- 第三步 -->
          <step-success v-if="active === 2" :data="form" @back="onBack" />
        </div>
        <div v-if="active === 0" style="padding: 0 25px">
          <div style="margin: 35px 0 25px 0">
            <el-divider />
          </div>
          <el-alert type="info" :closable="false" class="ele-alert-border">
            <h6 style="margin: 5px 0 15px 0">说明</h6>
            <h6 style="margin-bottom: 10px">错误信息修正</h6>
            <p style="margin-bottom: 15px">
              如果个人信息存在错误，请在基本信息页面提交修改申请并上传佐证文件。
            </p>
          </el-alert>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import stepOne from './components/step-one.vue';
  import stepTwo from './components/step-two.vue';
  import StepSuccess from './components/step-success.vue';

  export default {
    name: 'FormStep',
    components: {
      stepOne,
      stepTwo,
      StepSuccess
    },
    data() {
      return {
        // 选中步骤
        active: 0,
        // 数据
        form: {
          positions: [
            {
              position: '',
              company: '',
              info:{
                
              }
            }
          ],
          number: 1
        },
      };
    },
    methods: {
      onDone(data) {
        Object.assign(this.form, data);
        this.active = 1;
      },
      onNext() {
        this.active = 2;
      },
      onBack() {
        this.active = 0;
      }
    }
  };
</script>
