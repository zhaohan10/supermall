/**
 * 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { menuToRoutes } from 'ele-admin';
import {
  PROJECT_NAME,
  WHITE_LIST,
  HOME_PATH,
  REDIRECT_PATH
} from '@/config/setting';
import { getToken } from '@/utils/token-util';
import store from '@/store';
import EleLayout from '@/layout/index.vue';
import RedirectLayout from '@/components/RedirectLayout';
import RouterLayout from '@/components/RouterLayout/index.vue';
import NProgress from 'nprogress';

Vue.use(VueRouter);

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    component: () => import('@/views/forget'),
    meta: { title: '忘记密码' }
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/exception/404')
  },
  {
    path: '/welcome',
    component: () => import('@/views/welcome'),
    meta: { title: '系统首页' }
  },
  {
    path: '/welcome/information',
    component: () => import('@/views/welcome/information'),
    meta: { title: '竞聘公告' }
  },
  {
    path: '/welcome/publicity',
    component: () => import('@/views/welcome/publicity'),
    meta: { title: '结果公示' }
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!from.path.includes(REDIRECT_PATH)) {
    NProgress.start();
  }
  updateTitle(to);
  // 判断是否登录
  
  if (getToken()) {
    // 还未注册动态路由则先获取
    if (!store.state.user.menus) {
      store
        .dispatch('user/fetchUserInfo')
        .then(({ menus, homePath }) => {
          addMenuRoutes(menus, homePath);
          next({ ...to, replace: true });
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  } else if (WHITE_LIST.includes(to.path)) {
    next();
  } else {
    next({
      path: '/welcome',
      query: to.path === '/' ? {} : { from: to.path }
    });
  }
});

router.afterEach((to) => {
  if (!to.path.includes(REDIRECT_PATH)) {
    setTimeout(() => {
      NProgress.done(true);
    }, 300);
  }
});

/**
 * 添加动态路由
 * @param menus 菜单数据
 * @param homePath 菜单数据的第一个页面地址
 */
function addMenuRoutes(menus, homePath) {
  router.addRoute({
    path: '/',
    component: EleLayout,
    redirect: HOME_PATH ?? homePath,
    children: menuToRoutes(
      menus,
      getComponent,
      [],
      REDIRECT_PATH,
      RedirectLayout
    )
  });
}

/**
 * 更新浏览器标题
 * @param route 路由信息
 */
function updateTitle(route) {
  if (route && !route.path?.includes(REDIRECT_PATH)) {
    const names = [];
    if (route.meta?.title) {
      names.push(route.meta.title);
    }
    if (PROJECT_NAME) {
      names.push(PROJECT_NAME);
    }
    document.title = names.join(' - ');
  }
}

/**
 * 获取路由组件
 * @param component 组件名称
 */
function getComponent(component) {
  if (!component) {
    return RouterLayout;
  }
  return () => import('@/views/' + component);
}

export default router;
