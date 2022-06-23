<template>
  <div class="head">
    <div class="location">
      <div @click="selectPosition" class="title">
        <van-icon name="aim" />
        <span> 长安广场 </span>
        <van-icon name="arrow-down" />
      </div>
      <van-search
        v-model="value"
        shape="round"
        show-action
        background="#4dd64d"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template></van-search
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      value: "",
    };
  },
  components: {},
  methods: {
    selectPosition: function () {
      console.log("定位");
      this.$router.push("/location");
    },
    onSearch: function () {
      this.$router.push({
        path: "/search",
        query: {
          title: this.value,
        },
      });
    },
  },
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 110px;
}

.location {
  text-align: left;
  background-color: #4dd64d;
  width: 100%;
  height: 110px;
  position: fixed;
  top: 0;
  z-index: 999;
  visibility: visible;
  border-radius: 0 0 15px 15px;
}
.title {
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
