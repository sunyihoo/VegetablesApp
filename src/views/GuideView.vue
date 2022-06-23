<template>
  <div>
    <van-swipe :autoplay="2000" class="myswipe">
      <van-swipe-item v-for="(item, index) in imgList" :key="index">
        <van-image :src="item" height="900px"></van-image>
      </van-swipe-item>
    </van-swipe>
    <van-button type="default" plain hairline class="mybutton" @click="gomain">⽴即体验
    </van-button>
  </div>
</template>

<script>
export default {
  name: "GuideView",
  data() {
    return {
      imgList: [
        require("@/assets/img/guide/1.jpg"),
        require("@/assets/img/guide/2.jpg"),
        require("@/assets/img/guide/3.jpg"),
        require("@/assets/img/guide/4.png"),
        require("@/assets/img/guide/5.jpg"),
      ],
    };
  },
  methods: {
    gomain() {
      this.$router.push("/login");
    },
  },
  components: {},
};
</script>


<style scoped>
.myswipe {
  height: 100vh;
}

.mybutton {
  position: fixed;
  left: 50%;
  bottom: 20%;
  margin-left: -50px;
  background: transparent;
}

.van-button--default {
  color: white;
  height: 30px;
  width: 100px;
}
</style>