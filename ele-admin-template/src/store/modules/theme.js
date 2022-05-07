/**
 * 主题状态管理
 */
import {
  screenWidth,
  screenHeight,
  contentWidth,
  contentHeight
} from 'ele-admin';
import { changeColor } from 'ele-admin/es/utils/theme-util';
import { TAB_KEEP_ALIVE, THEME_STORE_NAME } from '@/config/setting';
// state默认值
const DEFAULT_STATE = Object.freeze({
  // 多页签数据
  tabs: [],
  // 是否折叠侧边栏
  collapse: false,
  // 是否折叠侧栏一级菜单
  sideNavCollapse: false,
  // 内容区域是否全屏
  bodyFullscreen: false,
  // 是否开启多页签
  showTabs: true,
  // 是否开启页脚
  showFooter: false,
  // 顶栏风格: light(亮色), dark(暗色), primary(主色)
  headStyle: 'primary',
  // 侧边栏风格: light(亮色), dark(暗色)
  sideStyle: 'dark',
  // 布局风格: side(默认), top(顶栏菜单), mix(混合菜单)
  layoutStyle: 'side',
  // 侧边栏菜单风格: default(默认), mix(双排菜单)
  sideMenuStyle: 'default',
  // 标签页风格: default(默认), dot(圆点), card(卡片)
  tabStyle: 'default',
  // 是否固定顶栏
  fixedHeader: false,
  // 是否固定侧栏
  fixedSidebar: true,
  // 是否固定主体
  fixedBody: true,
  // 内容区域宽度铺满
  bodyFull: true,
  // logo是否自适应宽度
  logoAutoSize: false,
  // 侧栏是否彩色图标
  colorfulIcon: false,
  // 侧栏是否只保持一个子菜单展开
  sideUniqueOpen: true,
  // 是否是色弱模式
  weakMode: false,
  // 是否是暗黑模式
  darkMode: false,
  // 主题色
  color: null,
  // 主页的组件
  homeComponents: [],
  // 刷新路由时的参数
  routeReload: null,
  // 屏幕宽度
  screenWidth: screenWidth(),
  // 屏幕高度
  screenHeight: screenHeight(),
  // 内容区域宽度
  contentWidth: contentWidth(),
  // 内容区域高度
  contentHeight: contentHeight()
});
// 延时操作定时器
let disableTransitionTimer, updateContentSizeTimer;
const weakClass = 'ele-admin-weak';
const disabledClass = 'ele-transition-disabled';

/**
 * 读取缓存配置
 */
function getCacheSetting() {
  try {
    const value = localStorage.getItem(THEME_STORE_NAME);
    if (value) {
      const cache = JSON.parse(value);
      if (typeof cache === 'object' && cache !== null) {
        return cache;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return {};
}

/**
 * 缓存配置
 */
function cacheSetting(key, value) {
  const cache = getCacheSetting();
  if (cache[key] !== value) {
    cache[key] = value;
    localStorage.setItem(THEME_STORE_NAME, JSON.stringify(cache));
  }
}

/**
 * 切换色弱模式
 */
function changeWeakMode(weakMode) {
  if (weakMode) {
    document.body.classList.add(weakClass);
  } else {
    document.body.classList.remove(weakClass);
  }
}

/**
 * 切换主题
 */
function changeTheme(value, dark) {
  return new Promise((resolve, reject) => {
    try {
      changeColor(value, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 切换布局时禁用过渡动画
 */
function disableTransition() {
  disableTransitionTimer && clearTimeout(disableTransitionTimer);
  document.body.classList.add(disabledClass);
  disableTransitionTimer = setTimeout(() => {
    document.body.classList.remove(disabledClass);
  }, 100);
}

/**
 * 获取含本地缓存的state值
 */
function getState() {
  const state = Object.assign({}, DEFAULT_STATE);
  const cache = getCacheSetting();
  Object.keys(state).forEach((key) => {
    if (typeof cache[key] !== 'undefined') {
      state[key] = cache[key];
    }
  });
  return state;
}

export default {
  namespaced: true,
  state: getState(),
  getters: {
    // 需要keep-alive的组件
    keepAliveInclude(state) {
      if (!TAB_KEEP_ALIVE || !state.showTabs) {
        return [];
      }
      const components = new Set();
      const { reloadPath, reloadHome } = state.routeReload || {};
      state.tabs?.forEach((t) => {
        const isReload = reloadPath && reloadPath === t.fullPath;
        if (!isReload && t.components) {
          t.components.forEach((c) => {
            if (typeof c === 'string' && c) {
              components.add(c);
            }
          });
        }
      });
      if (!reloadHome) {
        state.homeComponents?.forEach((c) => {
          if (typeof c === 'string' && c) {
            components.add(c);
          }
        });
      }
      return Array.from(components);
    }
  },
  mutations: {
    SET(state, { key, value }) {
      state[key] = value;
    }
  },
  actions: {
    setTabs({ commit }, value) {
      commit('SET', { key: 'tabs', value });
      //cacheSetting('tabs', value);
    },
    setCollapse({ commit, dispatch }, value) {
      commit('SET', { key: 'collapse', value });
      dispatch('delayUpdateContentSize', 800);
    },
    setSideNavCollapse({ commit, dispatch }, value) {
      commit('SET', { key: 'sideNavCollapse', value });
      dispatch('delayUpdateContentSize', 800);
    },
    setBodyFullscreen({ commit, dispatch }, value) {
      disableTransition();
      commit('SET', { key: 'bodyFullscreen', value });
      dispatch('delayUpdateContentSize', 800);
    },
    setShowTabs({ commit, dispatch }, value) {
      commit('SET', { key: 'showTabs', value });
      cacheSetting('showTabs', value);
      dispatch('delayUpdateContentSize');
    },
    setShowFooter({ commit, dispatch }, value) {
      commit('SET', { key: 'showFooter', value });
      cacheSetting('showFooter', value);
      dispatch('delayUpdateContentSize');
    },
    setHeadStyle({ commit }, value) {
      commit('SET', { key: 'headStyle', value });
      cacheSetting('headStyle', value);
    },
    setSideStyle({ commit }, value) {
      commit('SET', { key: 'sideStyle', value });
      cacheSetting('sideStyle', value);
    },
    setLayoutStyle({ commit, dispatch }, value) {
      disableTransition();
      commit('SET', { key: 'layoutStyle', value });
      cacheSetting('layoutStyle', value);
      dispatch('delayUpdateContentSize');
    },
    setSideMenuStyle({ commit, dispatch }, value) {
      disableTransition();
      commit('SET', { key: 'sideMenuStyle', value });
      cacheSetting('sideMenuStyle', value);
      dispatch('delayUpdateContentSize');
    },
    setTabStyle({ commit }, value) {
      commit('SET', { key: 'tabStyle', value });
      cacheSetting('tabStyle', value);
    },
    setFixedHeader({ commit }, value) {
      disableTransition();
      commit('SET', { key: 'fixedHeader', value });
      cacheSetting('fixedHeader', value);
    },
    setFixedSidebar({ commit }, value) {
      disableTransition();
      commit('SET', { key: 'fixedSidebar', value });
      cacheSetting('fixedSidebar', value);
    },
    setFixedBody({ commit }, value) {
      disableTransition();
      commit('SET', { key: 'fixedBody', value });
      cacheSetting('fixedBody', value);
    },
    setBodyFull({ commit, dispatch }, value) {
      commit('SET', { key: 'bodyFull', value });
      cacheSetting('bodyFull', value);
      dispatch('delayUpdateContentSize');
    },
    setLogoAutoSize({ commit }, value) {
      disableTransition();
      commit('SET', { key: 'logoAutoSize', value });
      cacheSetting('logoAutoSize', value);
    },
    setColorfulIcon({ commit }, value) {
      commit('SET', { key: 'colorfulIcon', value });
      cacheSetting('colorfulIcon', value);
    },
    setSideUniqueOpen({ commit }, value) {
      commit('SET', { key: 'sideUniqueOpen', value });
      cacheSetting('sideUniqueOpen', value);
    },
    setWeakMode({ commit }, value) {
      return new Promise((resolve) => {
        changeWeakMode(value);
        commit('SET', { key: 'weakMode', value });
        cacheSetting('weakMode', value);
        resolve();
      });
    },
    setDarkMode({ commit, state }, value) {
      return new Promise((resolve, reject) => {
        changeTheme(state.color, value)
          .then(() => {
            commit('SET', { key: 'darkMode', value });
            cacheSetting('darkMode', value);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    setColor({ commit, state }, value) {
      return new Promise((resolve, reject) => {
        changeTheme(value, state.darkMode)
          .then(() => {
            commit('SET', { key: 'color', value });
            cacheSetting('color', value);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // 设置主页对应的组件
    setHomeComponents({ commit }, value) {
      commit('SET', { key: 'homeComponents', value });
    },
    // 设置刷新路由信息
    setRouteReload({ commit }, value) {
      commit('SET', { key: 'routeReload', value });
    },
    // 更新屏幕尺寸
    updateScreenSize({ commit, dispatch }) {
      commit('SET', { key: 'screenWidth', value: screenWidth() });
      commit('SET', { key: 'screenHeight', value: screenHeight() });
      dispatch('updateContentSize');
    },
    // 更新内容区域尺寸
    updateContentSize({ commit }) {
      commit('SET', { key: 'contentWidth', value: contentWidth() });
      commit('SET', { key: 'contentHeight', value: contentHeight() });
    },
    // 延时更新内容区域尺寸
    delayUpdateContentSize({ dispatch }, delay) {
      updateContentSizeTimer && clearTimeout(updateContentSizeTimer);
      updateContentSizeTimer = setTimeout(() => {
        dispatch('updateContentSize');
      }, delay ?? 100);
    },
    // 重置配置
    resetSetting({ commit, state }) {
      return new Promise((resolve, reject) => {
        disableTransition();
        [
          'showTabs',
          'showFooter',
          'headStyle',
          'sideStyle',
          'layoutStyle',
          'sideMenuStyle',
          'tabStyle',
          'fixedHeader',
          'fixedSidebar',
          'fixedBody',
          'bodyFull',
          'logoAutoSize',
          'colorfulIcon',
          'sideUniqueOpen',
          'weakMode',
          'darkMode',
          'color'
        ].forEach((key) => {
          commit('SET', { key, value: DEFAULT_STATE[key] });
        });
        localStorage.removeItem(THEME_STORE_NAME);
        changeWeakMode(state.weakMode);
        changeTheme(state.color, state.darkMode)
          .then(() => {
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // 恢复主题
    recoverTheme({ state }) {
      // 恢复色弱模式
      if (state.weakMode) {
        changeWeakMode(true);
      }
      // 恢复主题色
      if (state.color || state.darkMode) {
        changeTheme(state.color, state.darkMode).catch((e) => {
          console.error(e);
        });
      }
    },
    // 添加页签
    tabAdd({ dispatch, state }, data) {
      if (Array.isArray(data)) {
        data.forEach((d) => {
          dispatch('tabAdd', d);
        });
        return;
      }
      const i = state.tabs.findIndex((d) => d.key === data.key);
      if (i === -1) {
        dispatch('setTabs', state.tabs.concat([data]));
      } else if (data.fullPath !== state.tabs[i].fullPath) {
        dispatch(
          'setTabs',
          state.tabs
            .slice(0, i)
            .concat([data])
            .concat(state.tabs.slice(i + 1))
        );
      }
    },
    // 关闭页签
    tabRemove({ dispatch, state }, key) {
      return new Promise((resolve) => {
        let index = -1;
        let lastIndex = -1;
        let last;
        let lastPath;
        for (let i = 0; i < state.tabs.length; i++) {
          const t = state.tabs[i];
          if (t.closable && (t.key === key || t.fullPath === key)) {
            index = i;
            break;
          }
          lastIndex = i;
          last = state.tabs[i];
          lastPath = last.fullPath;
        }
        dispatch(
          'setTabs',
          state.tabs.filter((_d, i) => i !== index)
        );
        resolve({ lastIndex, lastPath, last });
      });
    },
    // 关闭全部页签
    tabRemoveAll({ dispatch, state }, active) {
      return new Promise((resolve) => {
        const tab = state.tabs.find((d) => d.key === active);
        const stay = active ? !!(tab && tab.closable === false) : false;
        dispatch(
          'setTabs',
          state.tabs.filter((d) => !d.closable)
        );
        resolve(stay);
      });
    },
    // 关闭左侧页签
    tabRemoveLeft({ dispatch, state }, key) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].key === key) {
          dispatch(
            'setTabs',
            state.tabs
              .filter((d, j) => !d.closable && j < i)
              .concat(state.tabs.slice(i))
          );
          break;
        }
      }
    },
    // 关闭右侧页签
    tabRemoveRight({ dispatch, state }, key) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].key === key) {
          dispatch(
            'setTabs',
            state.tabs
              .slice(0, i + 1)
              .concat(state.tabs.filter((d, j) => !d.closable && j > i))
          );
          break;
        }
      }
    },
    // 关闭其它页签
    tabRemoveOther({ dispatch, state }, key) {
      dispatch(
        'setTabs',
        state.tabs.filter((d) => !d.closable || d.key === key)
      );
    },
    // 修改页签
    tabSetItem({ dispatch, state }, data) {
      let i = -1;
      if (data.key) {
        i = state.tabs.findIndex((d) => d.key === data.key);
      } else if (data.fullPath) {
        i = state.tabs.findIndex((d) => d.fullPath === data.fullPath);
      } else if (data.path) {
        i = state.tabs.findIndex((d) => d.path === data.path);
      }
      if (i !== -1) {
        const item = Object.assign({}, state.tabs[i]);
        if (data.title) {
          item.title = data.title;
        }
        if (typeof data.closable === 'boolean') {
          item.closable = data.closable;
        }
        if (data.components) {
          item.components = data.components;
        }
        dispatch(
          'setTabs',
          state.tabs
            .slice(0, i)
            .concat([item])
            .concat(state.tabs.slice(i + 1))
        );
      }
    }
  }
};
