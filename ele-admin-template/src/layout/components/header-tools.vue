<!-- 顶栏右侧区域 -->
<template>
  <div class="ele-admin-header-tool">
    <!-- 全屏切换 -->
    <div
      class="ele-admin-header-tool-item hidden-xs-only"
      @click="toggleFullscreen"
    >
      <i v-if="fullscreen" class="el-icon-_screen-restore"></i>
      <i v-else class="el-icon-_screen-full"></i>
    </div>
    <!-- 语言切换 -->
    <div class="ele-admin-header-tool-item">
      <el-dropdown placement="bottom" @command="changeLanguage">
        <i class="el-icon-_language"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en">
            <span :class="{ 'ele-text-primary': language === 'en' }">
              English
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="zh_CN">
            <span :class="{ 'ele-text-primary': language === 'zh_CN' }">
              简体中文
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="zh_TW">
            <span :class="{ 'ele-text-primary': language === 'zh_TW' }">
              繁體中文
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 消息通知 -->
    <div class="ele-admin-header-tool-item">
      <header-notice />
    </div>
    <!-- 用户信息 -->
    <div class="ele-admin-header-tool-item">
      <el-dropdown @command="onUserDropClick">
        <div class="ele-admin-header-avatar">
          <el-avatar :src="loginUser.avatar" />
          <span class="hidden-xs-only">{{ loginUser.nickname }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile" icon="el-icon-user">
            {{ $t('layout.header.profile') }}
          </el-dropdown-item>
          <el-dropdown-item command="password" icon="el-icon-key">
            {{ $t('layout.header.password') }}
          </el-dropdown-item>
          <el-dropdown-item
            command="logout"
            icon="el-icon-switch-button"
            divided
          >
            {{ $t('layout.header.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 主题设置 -->
    <div class="ele-admin-header-tool-item" @click="openSetting">
      <i class="el-icon-_more"></i>
    </div>
    <!-- 修改密码弹窗 -->
    <password-modal :visible.sync="passwordVisible" />
    <!-- 主题设置抽屉 -->
    <setting-drawer :visible.sync="settingVisible" />
  </div>
</template>

<script>
  import HeaderNotice from './header-notice.vue';
  import PasswordModal from './password-modal.vue';
  import SettingDrawer from './setting-drawer.vue';
  import { logout } from '@/utils/page-tab-util';
  import { I18N_CACHE_NAME } from '@/config/setting';

  export default {
    name: 'HeaderTools',
    components: { HeaderNotice, PasswordModal, SettingDrawer },
    props: {
      // 是否是全屏
      fullscreen: Boolean
    },
    data() {
      return {
        // 是否显示修改密码弹窗
        passwordVisible: false,
        // 是否显示主题设置抽屉
        settingVisible: false
      };
    },
    computed: {
      // 当前用户信息
      loginUser() {
        return this.$store.state.user.info;
      },
      // 当前显示语言
      language() {
        return this.$i18n.locale;
      }
    },
    methods: {
      /* 用户信息下拉点击事件 */
      onUserDropClick(command) {
        if (command === 'password') {
          this.passwordVisible = true;
        } else if (command === 'profile') {
          if (this.$route.fullPath !== '/user/profile') {
            this.$router.push('/user/profile');
          }
        } else if (command === 'logout') {
          // 退出登录
          this.$confirm(
            this.$t('layout.logout.message'),
            this.$t('layout.logout.title'),
            { type: 'warning' }
          )
            .then(() => {
              logout();
            })
            .catch(() => {});
        }
      },
      /* 全屏切换 */
      toggleFullscreen() {
        this.$emit('fullscreen');
      },
      /* 打开设置抽屉 */
      openSetting() {
        this.settingVisible = true;
      },
      /* 切换语言 */
      changeLanguage(key) {
        this.$i18n.locale = key;
        localStorage.setItem(I18N_CACHE_NAME, key);
      }
    }
  };
</script>
