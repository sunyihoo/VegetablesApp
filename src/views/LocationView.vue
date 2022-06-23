<template>
  <div>
    <NavBar title="选择收货地址"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "LocationView",
  components: { NavBar },
  methods: {
    backPre: function () {
      this.$router.go(-1);
    },
    confirm() {},
  },
};
</script>

<style scoped>
</style>
