<template>
  <div>
    <div>
      <van-tabs v-model="headactive" color="#4dd64d">
        <van-tab v-for="(item, index) in contentList" :key="index">
          <template #title>
            <van-row>
              <van-image
                :src="item.img"
                width="28"
                height="28"
                round
              ></van-image>
            </van-row>
            <van-row> {{ item.text }}</van-row>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="left">
        <van-sidebar v-model="activeKey" color="#4dd64d">
          <van-sidebar-item
            v-for="(item, index) in goodsList"
            :key="index * new Date().valueOf()"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="right">
        <ListGoods
          v-for="item in goodsList[activeKey].info"
          :key="item.type"
          :goodsinfo="item"
          :type="goodsList[activeKey].type"
        ></ListGoods>
      </div>
    </div>
  </div>
</template>

<script>
import ListGoods from "../components/GoodsList.vue";
import goodsList from "../components/data";
export default {
  name: "GoodsView",
  data() {
    return {
      headactive: 0,
      activeKey: 0,
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
    ListGoods,
  },
  methods: {},
};
</script>

<style  scoped>
/* .head {
  height: 90px;
  overflow: hidden;
  white-space: nowrap;
  overflow-x: auto;
} */
.content {
  display: flex;
}

.left {
  /* flex: 1; */
  position: relative;
  width: 30%;
}

.right {
  /* flex: 7; */
  width: 80%;
  height: 600px;
  overflow: auto;
}

/deep/.van-tabs--line .van-tabs__wrap {
  height: 80px;
}
.van-sidebar {
  width: 100px;
}

/deep/.van-sidebar-item--select::before {
  background-color: #14a817;
  height: 50px;
}

/deep/.van-sidebar-item--select {
  color: #14a817;
}
</style>
