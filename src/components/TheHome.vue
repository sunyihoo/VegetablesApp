<template>
  <div>
    <van-swipe :autoplay="2000" class="head">
      <van-swipe-item v-for="(item, index) in imgList" :key="index">
        <van-image :src="item" height="150"></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="midd">
      <van-grid :gutter="5" icon-size="60px" :border="false">
        <van-grid-item
          v-for="(item, index) in contentList"
          :key="index"
          :icon="item.img"
          :text="item.text"
          @click="toGoods"
        />
      </van-grid>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col
        span="12"
        v-for="(item, index) in goodsList[0].info"
        :key="index"
      >
        <GirdGoods :goodsinfo="item" :type="goodsList[0].type"></GirdGoods>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import GirdGoods from "../components/GirdGoods.vue";
import goodsList from "../components/data";

export default {
  name: "TheHome",
  data() {
    return {
      imgList: [
        require("@/assets/img/banner/banner1.jpg"),
        require("@/assets/img/banner/banner2.jpg"),
        require("@/assets/img/banner/banner3.jpg"),
        require("@/assets/img/banner/banner4.jpg"),
        require("@/assets/img/banner/banner5.jpg"),
        require("@/assets/img/banner/banner6.jpg"),
        require("@/assets/img/banner/banner7.jpg"),
        require("@/assets/img/banner/banner8.jpg"),
      ],
      goodsList: goodsList,
      contentList: [
        {
          img: require("@/assets/img/content/1.png"),
          text: "蔬菜豆制品",
        },
        {
          img: require("@/assets/img/content/2.png"),
          text: "肉禽蛋",
        },
        {
          img: require("@/assets/img/content/3.png"),
          text: "水产海鲜",
        },
        {
          img: require("@/assets/img/content/4.png"),
          text: "水果鲜花",
        },
        {
          img: require("@/assets/img/content/5.png"),
          text: "乳品烘焙",
        },
        {
          img: require("@/assets/img/content/6.png"),
          text: "预制菜",
        },
        {
          img: require("@/assets/img/content/7.png"),
          text: "速食冻品",
        },
        {
          img: require("@/assets/img/content/8.png"),
          text: "粮油调味",
        },
      ],
    };
  },
  components: {
    GirdGoods,
  },
  methods: {
    toGoods() {
      this.$router.push("/main/goods");
      this.$emit("updateAvtive");
    },
  },
};
</script>

<style scoped>
.head {
  margin-top: 2px;
  margin-bottom: 8px;
  /* background-color: #4dd64d; */
}
.midd {
  background-color: white;
  margin: auto 5px;
  margin-bottom: 15px;
}
/deep/.van-grid-item__icon + .van-grid-item__text {
  font-size: 15px;
}
</style>
