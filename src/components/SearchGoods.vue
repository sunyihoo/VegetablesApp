<template>
  <div>
    <NavBar :title="'搜索：' + query"></NavBar>
    <van-row type="flex" justify="space-around">
      <van-col span="12" v-for="(item, index) in dataList" :key="index">
        <GirdGoods :goodsinfo="item" :recvtype="item.type"></GirdGoods>
      </van-col>
    </van-row>
    <van-row v-if="dataList.length == 0" style="margin-top: 300px">
      未查询到包含该关键词的信息
    </van-row>
  </div>
</template>

<script>
import GirdGoods from "../components/GirdGoods.vue";
import goodsList from "../components/data";
import NavBar from "../components/NavBar.vue";
export default {
  name: "SearchGoods",
  data() {
    return {
      dataList: [],
      query: this.$route.query.title,
    };
  },
  components: { GirdGoods, NavBar },
  methods: {},
  mounted() {
    for (var i = 0; i < goodsList.length; i++) {
      goodsList[i].info.forEach((e) => {
        if (e.title.indexOf(this.query) != -1) {
          e.type = goodsList[i].type;
          this.dataList.splice(0, 0, e);
        }
      });
    }
  },
};
</script>

<style scoped>
</style>
