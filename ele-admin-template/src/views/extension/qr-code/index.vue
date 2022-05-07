<template>
  <div class="ele-body">
    <el-card shadow="never" header="二维码">
      <div style="padding-left: 20px">
        <vue-qr-code :text="text" :width="200" :height="200" />
      </div>
      <div style="margin-top: 15px; max-width: 160px">
        <el-input v-model="text" size="mini" :maxlength="150" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import VueQrCode from '@/components/VueQrCode/index.vue';

  export default {
    name: 'ExtensionQrCode',
    components: { VueQrCode },
    data() {
      return {
        // 二维码内容
        text: 'https://eleadmin.com'
      };
    }
  };
</script>
