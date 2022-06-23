<template>
  <div>
    <NavBar title="确认订单"></NavBar>
    <van-row class="head">
      <van-cell
        :title="address != null ? address : '请选择收货地址'"
        is-link
        value=""
        @click="addressShow"
      />
    </van-row>
    <van-divider :style="{ color: '#969799' }">订单明细</van-divider>
    <van-row class="content">
      <OrderList
        v-for="(item, index) in CartList"
        :key="index"
        :info="item"
      ></OrderList>
    </van-row>

    <van-row>
      <van-cell-group inset title="价格明细">
        <van-cell title="商品总价" :value="'￥' + allprice" />
        <van-cell title="商品总数" :value="'共 ' + total + ' 份'" />
        <van-cell title="下单时间" :value="getDate" />
      </van-cell-group>
    </van-row>
    <van-row class="pay">
      <van-cell title="支付方式" is-link value="微信支付" />
    </van-row>
    <van-row class="pay">
      <van-cell title="备注" is-link value="选填，可写下您的需求" />
    </van-row>

    <van-row class="bottom">
      <van-button size="large" type="primary" @click="confirm"
        >确认订单</van-button
      >
    </van-row>
    <van-popup
      v-model="show"
      round
      closeable
      close-icon="success"
      position="bottom"
      :style="{ height: '80%' }"
      @closed="close"
    >
      <div class="addressClass">
        <AddressSet></AddressSet>
      </div>
    </van-popup>
  </div>
</template>

<script>
import OrderList from "../components/OrderList.vue";
import AddressSet from "@/components/AddressSet.vue";
import NavBar from "../components/NavBar.vue";
import { get } from "../components/util";
import { getAddress } from "../components/util";
export default {
  name: "OrderView",
  data() {
    return {
      show: false,
      CartList: [],
      address: null,
      total: this.$route.query["total"],
      allprice: this.$route.query["price"],
    };
  },
  components: { OrderList, AddressSet, NavBar },
  methods: {
    confirm() {
      this.$toast("下单成功");
      setTimeout(() => {
        this.$router.push("/main/mine");
      }, 1500);
    },
    addressShow() {
      this.show = true;
    },
    close() {
      const addresslist = getAddress();
      addresslist.forEach((e) => {
        if (e.isDefault) {
          this.address = e.address;
        }
      });
    },
  },
  mounted() {
    this.CartList = get();
  },
  computed: {
    getDate: function () {
      var d = new Date();
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    },
  },
};
</script>

<style scoped>
.addressClass {
  margin-top: 50px;
}
.head .van-cell {
  margin: 5px 5px;
  border-radius: 10px 10px 10px 10px;
}
.van-divider {
  margin: 5px auto;
}
.pay {
  margin: 5px 5px;
  padding: 0 10px 0 10px;
}

.content {
  height: 330px;
  overflow: auto;
}

.pay .van-cell {
  border-radius: 10px 10px 10px 10px;
}

.bottom {
  margin: 5px 5px;
  padding: 0 10px 0 10px;
}

.bottom .van-button {
  border-radius: 10px 10px 10px 10px;
}
</style>
