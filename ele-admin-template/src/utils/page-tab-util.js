/**
 * 页签操作封装
 */
import store from '@/store';
import router from '@/router';
import { HOME_PATH, REDIRECT_PATH } from '@/config/setting';
import { removeToken } from '@/utils/token-util';
const BASE_URL = process.env.BASE_URL;
const HOME_ROUTE = HOME_PATH || '/';

/**
 * 刷新当前路由
 */
export function reloadPageTab() {
  const { path, fullPath, query, meta, matched } = router.currentRoute;
  if (path.includes(REDIRECT_PATH)) {
    return;
  }
  const { isHome } = meta;
  setRouteReload({
    reloadHome: isHome,
    reloadPath: isHome ? undefined : fullPath
  }).then(() => {
    router.replace({
      path: matched[matched.length - 2].path + REDIRECT_PATH + path,
      query
    });
  });
}

/**
 * 关闭当前页签
 */
export function finishPageTab() {
  const { fullPath } = router.currentRoute;
  removePageTab({ key: fullPath, active: fullPath });
}

/**
 * 关闭页签
 * @param key 页签的key
 * @param active 选中页签的key
 */
export function removePageTab({ key, active }) {
  store.dispatch('theme/tabRemove', key).then(({ lastPath }) => {
    if (active && key === active) {
      router.push(lastPath || HOME_ROUTE);
    }
  });
}

/**
 * 关闭全部页签
 */
export function removeAllPageTab(active) {
  store.dispatch('theme/tabRemoveAll', active).then((stay) => {
    if (!stay && active && active !== HOME_ROUTE) {
      router.push(HOME_ROUTE);
    }
  });
}

/**
 * 关闭左侧页签
 */
export function removeLeftPageTab(key) {
  return store.dispatch('theme/tabRemoveLeft', key);
}

/**
 * 关闭右侧页签
 */
export function removeRightPageTab(key) {
  return store.dispatch('theme/tabRemoveRight', key);
}

/**
 * 关闭其它页签
 */
export function removeOtherPageTab(key) {
  return store.dispatch('theme/tabRemoveOther', key);
}

/**
 * 添加页签
 */
export function addPageTab(data) {
  return store.dispatch('theme/tabAdd', data);
}

/**
 * 修改页签
 */
export function setPageTab(data) {
  return store.dispatch('theme/tabSetItem', data);
}

/**
 * 设置主页的组件名称
 */
export function setHomeComponents(data) {
  return store.dispatch('theme/setHomeComponents', data);
}

/**
 * 设置路由刷新信息
 */
export function setRouteReload(value) {
  return store.dispatch('theme/setRouteReload', value);
}

/**
 * 退出登录
 * @param from 是否使用路由跳转
 * @param from 登录后跳转的地址
 */
export function logout(route, from) {
  removeToken();
  // if (route) {
  //   router.push({
  //     path: '/login',
  //     query: from ? { from } : undefined
  //   });
  // } else {
  //   // 这样跳转避免再次登录重复注册动态路由
  //   location.replace(BASE_URL + 'login' + (from ? '?from=' + from : ''));
  // }
  router.push('/welcome')
}
