<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 按钮 -->
      <div style="margin-bottom: 16px">
        <el-button size="small" @click="setContent">修改内容</el-button>
        <el-button size="small" @click="showText">获取内容</el-button>
      </div>
      <!-- 编辑器 -->
      <byte-md-editor
        :value="content"
        :locale="zh_Hans"
        :plugins="plugins"
        @change="handleChange"
        class="ele-bytemd-wrap"
      />
    </el-card>
    <!-- 内容弹窗 -->
    <el-dialog width="400px" title="编辑器内容" :visible.sync="showViewContent">
      <div>{{ content }}</div>
    </el-dialog>
  </div>
</template>

<script>
  import { Editor as ByteMdEditor } from '@bytemd/vue';
  // 中文语言文件
  import zh_Hans from 'bytemd/lib/locales/zh_Hans.json';
  // 链接、删除线、复选框、表格等的插件
  import gfm from '@bytemd/plugin-gfm';
  // 插件的中文语言文件
  import zh_HansGfm from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
  // 编辑器css
  import 'bytemd/dist/index.min.css';
  // 预览界面的样式，这里用的github的markdown主题
  import 'github-markdown-css/github-markdown-light.css';

  export default {
    name: 'ExtensionMarkdown',
    components: { ByteMdEditor },
    data() {
      return {
        zh_Hans,
        // 编辑器内容
        content: '',
        // 插件
        plugins: [
          gfm({
            locale: zh_HansGfm
          })
        ],
        showViewContent: false
      };
    },
    methods: {
      /* 更新内容 */
      handleChange(value) {
        this.content = value;
      },
      /* 修改编辑器内容 */
      setContent() {
        this.content = '> **EleAdminPro**后台管理模板';
      },
      /* 获取编辑器内容 */
      showText() {
        this.showViewContent = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* 修改编辑器的高度和全屏的z-index */
  .ele-bytemd-wrap ::v-deep .bytemd {
    height: calc(100vh - 290px);

    &.bytemd-fullscreen {
      z-index: 999;
    }
  }
</style>
