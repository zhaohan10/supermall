<!-- 二维码组件 -->
<template>
  <div ref="root"></div>
</template>

<script>
  import QRCode from 'qrcodejs2';

  export default {
    name: 'VueQrCode',
    props: {
      text: String,
      width: {
        type: Number,
        default: 256
      },
      height: {
        type: Number,
        default: 256
      },
      colorDark: {
        type: String,
        default: '#000000'
      },
      colorLight: {
        type: String,
        default: '#ffffff'
      },
      correctLevel: {
        type: Number,
        default: QRCode.CorrectLevel.H
      }
    },
    data() {
      return {
        instance: undefined
      };
    },
    mounted() {
      if (this.text) {
        this.render();
      }
    },
    methods: {
      render() {
        this.clear();
        this.instance = new QRCode(this.getEl(), {
          text: this.text,
          width: this.width,
          height: this.height,
          colorDark: this.colorDark,
          colorLight: this.colorLight,
          correctLevel: this.correctLevel
        });
      },
      makeCode(value) {
        if (this.instance) {
          this.instance.makeCode(value);
        } else {
          this.render();
        }
      },
      clear() {
        this.instance?.clear();
        this.instance = undefined;
        this.getEl().innerHTML = '';
        this.getEl().title = '';
      },
      getEl() {
        return this.$refs.root;
      }
    },
    watch: {
      text(text) {
        if (text) {
          this.makeCode(text);
        } else {
          this.clear();
        }
      },
      width() {
        this.render();
      },
      height() {
        this.render();
      },
      colorDark() {
        this.render();
      },
      colorLight() {
        this.render();
      },
      correctLevel() {
        this.render();
      }
    }
  };
</script>
