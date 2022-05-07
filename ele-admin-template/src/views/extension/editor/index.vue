<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 编辑器 -->
      <tinymce-editor v-model="value" :init="option" />
    </el-card>
  </div>
</template>

<script>
  import TinymceEditor from '@/components/TinymceEditor';

  export default {
    name: 'ExtensionEditor',
    components: { TinymceEditor },
    data() {
      return {
        option: {
          height: auto,
        },
        value: '',
      };
    },
    methods: {

    }
  };
</script>
