<!-- 框架布局 -->
<template>
  <ele-pro-layout
    :menus="menus"
    :tabs="theme.tabs"
    :collapse="theme.collapse"
    :side-nav-collapse="theme.sideNavCollapse"
    :body-fullscreen="theme.bodyFullscreen"
    :show-tabs="theme.showTabs"
    :show-footer="theme.showFooter"
    :head-style="theme.headStyle"
    :side-style="theme.sideStyle"
    :layout-style="theme.layoutStyle"
    :side-menu-style="theme.sideMenuStyle"
    :tab-style="theme.tabStyle"
    :fixed-header="theme.fixedHeader"
    :fixed-sidebar="theme.fixedSidebar"
    :fixed-body="theme.fixedBody"
    :body-full="theme.bodyFull"
    :logo-auto-size="theme.logoAutoSize"
    :colorful-icon="theme.colorfulIcon"
    :side-unique-open="theme.sideUniqueOpen"
    :project-name="PROJECT_NAME"
    :hide-footers="HIDE_FOOTERS"
    :hide-sidebars="HIDE_SIDEBARS"
    :repeatable-tabs="REPEATABLE_TABS"
    :home-title="homeTitle"
    :locale="locale"
    :i18n="i18n"
    @update:collapse="updateCollapse"
    @update:side-nav-collapse="updateSideNavCollapse"
    @update:body-fullscreen="updateBodyFullscreen"
    @tab-add="addPageTab"
    @tab-remove="removePageTab"
    @tab-remove-all="removeAllPageTab"
    @tab-remove-left="removeLeftPageTab"
    @tab-remove-right="removeRightPageTab"
    @tab-remove-other="removeOtherPageTab"
    @reload-page="reloadPageTab"
    @logo-click="onLogoClick"
    @screen-size-change="screenSizeChange"
    @set-home-components="setHomeComponents"
  >
    <!-- 路由出口 -->
    <router-layout />
    <!-- logo图标 -->
    <template slot="logo">
      <img src="@/assets/logo.svg" alt="logo" />
    </template>
    <!-- 顶栏右侧区域 -->
    <template slot="right">
      <header-tools :fullscreen="fullscreen" @fullscreen="onFullscreen" />
    </template>
    <!-- 全局页脚 -->
    <template slot="footer">
      <page-footer />
    </template>
    <!-- 自定义菜单标题增加徽章、小红点 -->
    <template slot="title" slot-scope="{ title, item }">
      <span>{{ title }} </span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <el-badge :value="item.meta.badge" :type="item.meta.badgeColor" />
      </div>
    </template>
    <template slot="top-title" slot-scope="{ title, item }">
      <span>{{ title }} </span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <el-badge :value="item.meta.badge" :type="item.meta.badgeColor" />
      </div>
    </template>
    <template slot="nav-title" slot-scope="{ title, item }">
      <span>{{ title }} </span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <el-badge :value="item.meta.badge" :type="item.meta.badgeColor" />
      </div>
    </template>
  </ele-pro-layout>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { toggleFullscreen, isFullscreen } from 'ele-admin';
  import RouterLayout from '@/components/RouterLayout/index.vue';
  import HeaderTools from './components/header-tools.vue';
  import PageFooter from './components/page-footer.vue';
  import {
    PROJECT_NAME,
    HIDE_SIDEBARS,
    HIDE_FOOTERS,
    REPEATABLE_TABS,
    HOME_TITLE
  } from '@/config/setting';
  import {
    addPageTab,
    removePageTab,
    removeAllPageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    reloadPageTab,
    setHomeComponents
  } from '@/utils/page-tab-util';

  export default {
    name: 'EleLayout',
    components: {
      RouterLayout,
      HeaderTools,
      PageFooter
    },
    data() {
      return {
        PROJECT_NAME,
        HIDE_SIDEBARS,
        HIDE_FOOTERS,
        REPEATABLE_TABS,
        // 是否全屏
        fullscreen: false
      };
    },
    computed: {
      // 当前语言
      locale() {
        return this.$i18n.locale;
      },
      // 主页标题
      homeTitle() {
        return HOME_TITLE ?? this.$t('layout.home');
      },
      // 菜单数据
      menus() {
        return this.$store.state.user.menus;
      },
      // 主题状态
      ...mapGetters(['theme'])
    },
    methods: {
      updateCollapse(value) {
        this.$store.dispatch('theme/setCollapse', value);
      },
      updateSideNavCollapse(value) {
        this.$store.dispatch('theme/setSideNavCollapse', value);
      },
      updateBodyFullscreen(value) {
        this.$store.dispatch('theme/setBodyFullscreen', value);
      },
      onLogoClick(isHome) {
        isHome || this.$router.push('/');
      },
      screenSizeChange() {
        this.$store.dispatch('theme/updateScreenSize');
        this.fullscreen = isFullscreen();
      },
      onFullscreen() {
        try {
          this.fullscreen = toggleFullscreen();
        } catch (e) {
          this.$message.error('您的浏览器不支持全屏模式');
        }
      },
      /* 菜单标题国际化 */
      i18n(_path, key) {
        const k = 'route.' + key + '._name';
        const title = this.$t(k);
        return title === k ? undefined : title;
      },
      //
      addPageTab,
      removePageTab,
      removeAllPageTab,
      removeLeftPageTab,
      removeRightPageTab,
      removeOtherPageTab,
      reloadPageTab,
      setHomeComponents
    }
  };
</script>

<style lang="scss">
  // 侧栏菜单徽章样式，定位在右侧垂直居中并调小尺寸
  .ele-menu-badge {
    position: absolute;
    top: 50%;
    right: 14px;
    line-height: 1;
    margin-top: -9px;
    font-size: 0;

    .el-badge__content {
      height: 18px;
      line-height: 18px;
      border-radius: 9px;
      border: none;
      min-width: 18px;
      padding: 0 4px;
      box-sizing: border-box;
    }
  }

  // 父级菜单标题中右侧多定位一点，避免与箭头重合
  .el-submenu > .el-submenu__title .ele-menu-badge {
    right: 36px;
  }

  // 折叠悬浮中样式调整
  .el-menu--popup {
    .el-submenu > .el-submenu__title .ele-menu-badge {
      right: 20px;
    }
  }

  // 侧栏折叠后样式调整
  .ele-admin-collapse .ele-admin-sidebar-menus > .el-menu {
    & > .el-menu-item,
    & > .el-submenu > .el-submenu__title {
      .ele-menu-badge {
        top: 6px;
        right: 6px;
        margin: 0;
      }
    }
  }

  // 顶栏菜单标题中样式调整
  .ele-admin-header-nav.el-menu {
    & > .el-menu-item,
    & > .el-submenu > .el-submenu__title {
      .ele-menu-badge {
        position: static;
        right: auto;
        top: auto;
        display: inline-block;
        vertical-align: 6px;
        margin: 0 0 0 2px;
      }
    }
  }

  // 双侧栏时一级侧栏菜单中样式调整，定位在右上角
  .ele-admin-sidebar-nav-menu > .el-menu {
    & > .el-menu-item,
    & > .el-submenu > .el-submenu__title {
      .ele-menu-badge {
        top: 2px;
        right: 4px;
        margin: 0;
      }
    }
  }

  // 双侧栏时一级侧栏菜单折叠后样式调整
  .ele-admin-nav-collapse .ele-admin-sidebar-nav-menu > .el-menu {
    & > .el-menu-item,
    & > .el-submenu > .el-submenu__title {
      .ele-menu-badge {
        top: -2px;
        right: -2px;
      }
    }
  }
</style>
