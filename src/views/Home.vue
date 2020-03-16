<template>
  <div class="home">
    主页
  </div>
</template>

<script>
import bus from './bus'
export default {
  name: 'Home',
  mounted() {
    bus.$emit('change',1)
  },
}
</script>
