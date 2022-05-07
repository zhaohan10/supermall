/**
 * echarts混入
 */
import store from '@/store';
import { THEME_KEY } from 'vue-echarts';
import { ChartTheme } from 'ele-admin';

export function echartsMixin(refs) {
  return {
    provide: {
      // 主题设置
      [THEME_KEY]: ChartTheme
    },
    computed: {
      // 内容区域宽度
      layoutContentWidth() {
        return store?.state?.theme?.contentWidth;
      }
    },
    watch: {
      // 监听内容区域宽度变化
      layoutContentWidth() {
        this.resizeAllCharts();
      }
    },
    // 适配keep-alive
    activated() {
      this.resizeAllCharts();
    },
    methods: {
      // 重置echarts尺寸
      resizeAllCharts() {
        refs.forEach((ref) => {
          this.$refs[ref]?.resize();
        });
      }
    }
  };
}
