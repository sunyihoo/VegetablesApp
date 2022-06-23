<template>
  <div>
    <van-row type="flex" justify="space-around" class="head">
      <van-col span="6">
        <van-image :src="headImg" round></van-image>
      </van-col>
      <van-col span="14" class="info">
        <div class="name">{{ this.currentuser.username }}</div>
        <div class="phone">
          <van-icon name="phone-circle-o" />
          {{ this.currentuser.phone }}
        </div>
      </van-col>
    </van-row>

    <van-row class="coupon">
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
    </van-row>
    <div class="order">
      <van-row>
        <van-cell title="我的订单" is-link value="内容" />
      </van-row>
      <van-row>
        <van-grid :border="false">
          <van-grid-item
            v-for="(item, index) in orderList"
            :key="index"
            :icon="item.img"
            :text="item.title"
          />
        </van-grid>
      </van-row>
    </div>

    <div class="order">
      <van-row>
        <van-grid :border="false">
          <van-grid-item
            v-for="(item, index) in settingList"
            :key="index"
            :icon="item.img"
            :text="item.title"
            @click="setting(index)"
          />
        </van-grid>
      </van-row>
    </div>

    <van-divider
      :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }"
      >猜你喜欢</van-divider
    >
    <van-row type="flex" justify="space-around">
      <van-col
        span="12"
        v-for="(item, index) in goodsList[0].info"
        :key="index"
      >
        <GirdGoods :goodsinfo="item"></GirdGoods>
      </van-col>
    </van-row>
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import GirdGoods from "../components/GirdGoods.vue";
import goodsList from "../components/data";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  data() {
    return {
      showList: false,
      currentuser: [],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      headImg: require("@/assets/img/login.jpg"),
      goodsList: goodsList,
      settingList: [
        {
          img: require("@/assets/img/mine/我的收藏.png"),
          title: "我的收藏",
        },
        {
          img: require("@/assets/img/mine/收货地址.png"),
          title: "收货地址",
        },
        {
          img: require("@/assets/img/mine/客服.png"),
          title: "客服与帮助",
        },
        {
          img: require("@/assets/img/mine/设置.png"),
          title: "设置",
        },
      ],
      orderList: [
        {
          img: require("@/assets/img/mine/待支付.png"),
          title: "待支付",
        },
        {
          img: require("@/assets/img/mine/待收货.png"),
          title: "待收货",
        },
        {
          img: require("@/assets/img/mine/待评价.png"),
          title: "待评价",
        },
        {
          img: require("@/assets/img/mine/售后.png"),
          title: "售后/退款",
        },
      ],
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(coupon) {
      this.coupons.push(coupon);
    },
    setting(idx) {
      // console.log(idx);
      if (idx == 1) {
        this.$router.push("/location/addressset");
      }
      if (idx == 3) {
        this.$router.push("/setting");
      }
    },
  },
  components: {
    GirdGoods,
  },
  mounted() {
    this.currentuser = JSON.parse(localStorage.getItem("currentuser"));
  },
};
</script>

<style scoped>
.head {
  margin-top: 50px;
}

.coupon {
  margin: 15px 5px;
}

.order {
  margin: 10px 5px;
}

.info {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.info .name {
  flex: 4;
  font-size: 20px;
  font-weight: bolder;
}

.info .phone {
  flex: 4;
}

.box {
  background-color: white;
  padding: 15px 5px 5px 5px;
  margin: 5px 5px;
  border-radius: 10px;
}
</style>
