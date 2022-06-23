<template>
  <div class="box" @click="onDetail">
    <van-row type="flex" justify="space-around">
      <van-col span="8">
        <van-image :src="goodsinfo.imgUrl" width="90" height="90"></van-image>
      </van-col>
      <van-col span="14">
        <GoodsShow :goodsinfo="goodsinfo" :type="type"></GoodsShow>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import GoodsShow from "@/components/GoodsShow.vue";

export default {
  name: "ListGoods",
  data() {
    return {
      imgUrl: require("@/assets/img/goods/goods1.jpg"),
    };
  },
  props: {
    goodsinfo: {
      type: Object,
    },
    type: {},
  },
  components: { GoodsShow },
  methods: {
    onDetail() {
      this.$router.push({
        path: "/detail",
        query: {
          type: this.type,
          id: this.goodsinfo.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.box {
  background-color: white;
  padding: 15px 5px 5px 5px;
  margin: 5px 5px;
  border-radius: 10px;
}
</style>
