<template>
  <div class="ele-body">
    <el-row :gutter="15">
      <el-col :md="8" :sm="8">
        <el-card shadow="never" body-style="padding: 25px;">
          <div class="user-info-card">
            <div class="user-info-avatar-group" @click="openCropper">
              <img class="user-info-avatar" :src="loginUser.avatar" alt="" />
              <i class="el-icon-upload2"></i>
            </div>
            <!-- <h4 class="user-info-name">账号：{{ loginUser.nickName }}</h4> -->
          </div>
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>姓名：{{ loginUser.realName }}</span>
            </div>
            <div class="user-info-item">
              <i
                :class="loginUser.sex == 1 ? 'el-icon-male' : 'el-icon-female'"
              ></i>
              <span>性别：{{ loginUser.sex == 1 ? '男' : '女' }}</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-_user-group"></i>
              <span>民族：{{ loginUser.ethnic }}</span>
            </div>
          </div>
          <div style="margin: 10px 0 20px 0">
            <el-divider class="ele-divider-dashed ele-divider-base" />
          </div>
          <div>
            <template style="margin-top: 10px">
              <el-alert
                title="如个人信息存在错误，请点击按钮进行修改"
                type="warning"
                :closable="false"
              >
              </el-alert>
              <div style="height: 15px"></div>
              <el-button type="primary" round style="float: right" @click="edit"
                >点击修改</el-button
              >
              <div style="height: 55px"></div>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-card shadow="never" body-style="padding-top: 5px; ">
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>出生年月：{{ loginUser.birthday }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>年龄：{{ loginUser.age }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-location-information"></i>
              <span>出生地：{{ loginUser.birthplace }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-school"></i>
              <span>毕业院校：{{ loginUser.colleges }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-notebook-1"></i>
              <span>所学专业：{{ loginUser.specialty }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-_school"></i>
              <span>全日制教育：{{ loginUser.fulltimeEdu }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>在职教育：{{ loginUser.inserviceEdu }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-trophy"></i>
              <span>职称：{{ loginUser.jobTitle }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-_setting-solid"></i>
              <span>技能等级：{{ loginUser.skillLevel }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-office-building"></i>
              <span>单位：{{ loginUser.firm }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-phone"></i>
              <span>职务：{{ loginUser.post }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-wind-power"></i>
              <span>入党时间：{{ loginUser.partyTime }}</span>
            </div></div
          >
        </el-col>
        <el-col :md="12" :sm="12">
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-date"></i>
              <span>参加工作时间：{{ loginUser.workTime }}</span>
            </div></div
          >
        </el-col>
        <el-col style="height: 25px"></el-col>
      </el-card>
    </el-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-dialog
      :show.sync="visible"
      :src="form.avatar"
      :lock-scroll="false"
      @crop="onCrop"
    />
  </div>
</template>

<script>
  import EleCropperDialog from 'ele-admin/es/ele-cropper-dialog';

  export default {
    name: 'UserProfile',
    components: { EleCropperDialog },
    data() {
      return {
        // tab页选中
        active: 'info',
        // 表单数据
        form: {
          nickname: '',
          sex: '1',
          email: '',
          tellPre: '',
          tell: '',
          avatar: ''
        },
        // 表单验证规则
        rules: {},
        // 保存按钮loading
        loading: false,
        // 是否显示裁剪弹窗
        visible: false
      };
    },
    computed: {
      // 登录用户信息
      loginUser() {
        return {
          nickName: '管理员',
          realName: '张三',
          sex: '1',
          birthday: '1987.08',
          age: '42岁',
          // 民族
          ethnic: '汉族',
          // 毕业院校
          colleges: '郑州大学',

          // 专业
          specialty: '电气工程及自动化',
          // 全日制教育
          fulltimeEdu: '研究生',
          // 在职教育
          inserviceEdu: '硕士',
          // 专业技术职称
          jobTitle: '中级工程师',

          skillLevel: '初级工',
          // 单位
          firm: '平高电气事业部',
          // 职务
          post: '设计员',
          // 入党时间
          partyTime: '2018-09-11',
          // 参加工作时间
          workTime: '2019-09-11',
          avatar: ''
        };
      }
    },
    created() {
      Object.assign(this.form, this.loginUser, {
        tellPre: '0752',
        tell: ''
      });
    },
    methods: {
      /* 保存更改 */
      save() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message.success('保存成功');
            this.updateLoginUser(this.form);
          }, 800);
        });
      },
      /* 修改登录用户 */
      updateLoginUser(data) {
        this.$store.dispatch(
          'user/setInfo',
          Object.assign({}, this.loginUser, data)
        );
      },
      /* 头像裁剪完成回调 */
      onCrop(result) {
        this.form.avatar = result;
        this.visible = false;
        this.updateLoginUser(this.form);
      },
      /* 打开图片裁剪 */
      openCropper() {
        this.visible = true;
      }
    }
  };
</script>

<style scoped>
  .ele-body {
    padding-bottom: 0;
  }

  /* 用户资料卡片 */
  .user-info-card {
    padding-top: 8px;
    text-align: center;
  }

  .user-info-card .user-info-avatar-group {
    position: relative;
    cursor: pointer;
    margin: 0 auto;
    width: 110px;
    height: 150px;
    /* border-radius: 50%; */
    overflow: hidden;
  }

  .user-info-card .user-info-avatar {
    width: 110px;
    height: 150px;
    background: rgba(0, 0, 0, 0.2);
    /* border-radius: 50%; */
    object-fit: cover;
  }

  .user-info-card .user-info-avatar-group > i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    display: none;
    z-index: 2;
  }

  .user-info-card .user-info-avatar-group:hover > i {
    display: block;
  }

  .user-info-card .user-info-avatar-group:hover:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .user-info-card .user-info-name {
    font-size: 24px;
    margin-top: 20px;
  }

  /* 用户信息列表 */
  .user-info-list {
    margin-top: 30px;
    margin-left: 40px;
    margin-bottom: 5px;
    /* display:block;
    text-align: center; */
  }

  .user-info-list .user-info-item {
    margin-bottom: 10px;
    display: flex;
    align-items: baseline;
  }

  .user-info-item > i {
    margin-right: 10px;
    font-size: 16px;
  }

  .user-info-item > span {
    flex: 1;
    font-size: 16px;
    display: block;
  }

  .user-account-list .user-account-item {
    padding: 15px;
  }

  .user-account-list .user-account-item .ele-text-secondary {
    margin-top: 6px;
  }

  .user-account-list .user-account-item .user-account-icon {
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    color: #fff;
    font-size: 26px;
    border-radius: 50%;
    background-color: #3492ed;
    box-sizing: border-box;
  }

  .user-account-list .user-account-item .user-account-icon.el-icon-_wechat {
    background-color: #4daf29;
    font-size: 28px;
  }

  .user-account-list .user-account-item .user-account-icon.el-icon-_alipay {
    background-color: #1476fe;
    padding-left: 5px;
    font-size: 32px;
  }

  /* tab页签 */
  .user-info-tabs ::v-deep .el-tabs__nav-wrap {
    padding-left: 20px;
  }
</style>
