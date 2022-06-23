<template>
  <div type="fixed">
    <van-nav-bar
      left-arrow
      left-text="返回"
      :right-text="right"
      :title="title"
      @click-left="goBack"
      @click-right="goBack"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  props: ["title", "right"],
};
</script>

<style scoped>
/deep/.van-nav-bar__title {
  color: white !important;
  font-size: 18px;
}
/deep/.van-nav-bar .van-icon {
  color: white;
}

/deep/.van-nav-bar__text {
  color: white;
}

/deep/.van-nav-bar {
  background-color: #4dd64d;
}
</style>
