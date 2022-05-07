// 接口地址
export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

// 项目名称
export const PROJECT_NAME = process.env.VUE_APP_NAME;

// 不显示侧栏的路由
export const HIDE_SIDEBARS = [];

// 不显示页脚的路由
export const HIDE_FOOTERS = [
  '/system/dictionary',
  '/system/organization',
  '/form/advanced',
  '/example/choose'
];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = ['/system/user-info'];

// 不需要登录的路由
export const WHITE_LIST = ['/login', '/forget','/welcome','/welcome/information','/welcome/publicity'];

// 直接指定菜单数据
export const USER_MENUS = null;

// 首页名称, 为空则取第一个菜单的名称
export const HOME_TITLE = '首页';

// 首页路径, 为空则取第一个菜单的地址
// export const HOME_PATH = '/list';
export const HOME_PATH = '/list/home';


// 开启多页签是否缓存组件
//export const TAB_KEEP_ALIVE = process.env.NODE_ENV !== 'development';
export const TAB_KEEP_ALIVE = true;

// token传递的header名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme';

// i18n缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 高德地图key
export const MAP_KEY = '006d995d433058322319fa797f2876f5';

// EleAdmin授权码
export const LICENSE_CODE =
  'dk9mcwJyetRWQlxWRiojIqJWdzJCLi4WazKr5iojI0NWZh+L5dOJ6X2Y5Jyp5Aqo5Re657uL5jSL6QmZ6iwiI4+Y5sWY52gTMxIiOiQWaRJHOUNlWW9WLvl2cyVmdiwiIw4COuEjI6Iib0nI0NW=';
