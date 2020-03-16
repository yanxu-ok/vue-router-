<template>
  <div class="about">关于</div>
</template>
<script>
import bus from "./bus";
export default {
  mounted() {
    bus.$on('change', (...args) => {
      console.log(args);
    });
  }
};
</script>
