<template>
  <div class="box">
    <van-card :title="goodsInfo.title" :thumb="goodsInfo.imgUrl">
      <template #bottom>
        <div class="price">单价：￥{{ goodsInfo.price }}</div>
        <div class="price">数量：{{ info.num }}/份</div>
      </template>
    </van-card>
  </div>
</template>

<script>
import goodsList from "../components/data";
export default {
  name: "OrderList",
  data() {
    return {
      goodsInfo: {},
      cardList: [],
    };
  },
  components: {},
  methods: {},
  mounted() {
    goodsList.forEach((e) => {
      if (e.type == this.info.type) {
        this.goodsInfo = e.info[this.info.id];
      }
    });
  },
  props: {
    num: {},
    info: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.box {
  background-color: white;
  margin: 5px 15px;
  padding: 0 10px 0 10px;
  border-radius: 10px 10px 10px 10px;
}

.van-card__title {
  max-height: 50px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
}

.van-card__bottom {
  justify-content: space-between;
  text-align: left;
}
.van-card__content {
  text-align: left;
}
.price {
  height: 30px;
}
</style>
