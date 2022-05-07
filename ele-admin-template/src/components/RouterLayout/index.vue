<!-- router-view 结合 keep-alive 组件 -->
<template>
  <keep-alive :include="include">
    <router-view />
  </keep-alive>
</template>

<script>
  export default {
    name: 'RouterLayout',
    computed: {
      include() {
        return this.$store.getters['theme/keepAliveInclude'] ?? [];
      }
    }
  };
</script>
