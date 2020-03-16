<template>
  <div id="app">
    hello
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'app',
  data() {
    return {};
  },
  mounted(){
    console.log(this.$router,this.$route)
  }
};
</script>

