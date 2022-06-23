<template>
  <div class="box" @click="onDetail">
    <div>
      <van-row>
        <van-image :src="goodsinfo.imgUrl" width="162" height="162"></van-image>
      </van-row>
      <GoodsShow :goodsinfo="goodsinfo" :type="type"></GoodsShow>
    </div>
  </div>
</template>

<script>
import GoodsShow from "@/components/GoodsShow.vue";

export default {
  name: "GirdGoods",
  data() {
    return {
      type: this.recvtype ? this.recvtype : 1,
    };
  },
  props: {
    goodsinfo: {
      type: Object,
    },
    recvtype: {},
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
