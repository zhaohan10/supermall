/**
 * 国际化配置
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import eleZhCNLocale from 'ele-admin/es/lang/zh-CN';
import eleZhTWLocale from 'ele-admin/es/lang/zh-TW';
import eleEnLocale from 'ele-admin/es/lang/en';
import zhCNLocale from './lang/zh_CN';
import zhTWLocale from './lang/zh_TW';
import enLocale from './lang/en';
import { I18N_CACHE_NAME } from '@/config/setting';

Vue.use(VueI18n);

const messages = {
  zh_CN: { ...eleZhCNLocale, ...zhCNLocale },
  zh_TW: { ...eleZhTWLocale, ...zhTWLocale },
  en: { ...eleEnLocale, ...enLocale }
};

const i18n = new VueI18n({
  messages: messages,
  silentTranslationWarn: true,
  // 默认语言
  locale: localStorage.getItem(I18N_CACHE_NAME) || 'zh_CN'
});

export default i18n;
