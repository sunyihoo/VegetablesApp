<template>
  <div>
    <van-nav-bar title="购物车" placeholder fixed></van-nav-bar>
    <CartList
      v-for="(item, index) in CartList"
      :key="index"
      :info="item"
      @sendmsg="recvmsg"
      :allchecked="isSend"
    ></CartList>
    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="allCheck" @click="isAllChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
import goodsList from "../components/data";

import { get } from "../components/util";

export default {
  name: "CartView",
  data() {
    return {
      allchecked: true,
      CartList: [],
      isSend: true,
      totalNum: 0,
    };
  },
  components: { CartList },
  methods: {
    onSubmit: function () {
      this.$router.push({
        path: "/order",
        query: {
          total: this.totalNum,
          price: this.allPrice / 100,
        },
      });
    },
    goBack: function () {
      this.$router.go(-1);
    },
    recvmsg: function (val) {
      this.CartList = val;
    },
    isAllChecked() {
      this.isSend = !this.isSend;
    },
  },
  mounted() {
    this.CartList = get();
  },
  computed: {
    allPrice: function () {
      let price = 0;
      this.CartList.forEach((e) => {
        if (e.checked) {
          price += goodsList[e.type - 1]["info"][e.id].price * e.num * 100;
        }
      });
      // console.log(price / 100);
      return price;
    },
    allCheck: {
      get() {
        for (var i = 0; i < this.CartList.length; i++) {
          if (!this.CartList[i].checked) return false;
        }
        return true;
      },
      set(val) {
        console.log(val);
        return val;
      },
    },
  },
  watch: {
    CartList: {
      handler: function () {
        let total = 0;
        for (var i = 0; i < this.CartList.length; i++) {
          if (this.CartList[i].checked) total += this.CartList[i].num;
        }
        // console.log(total);
        this.totalNum = total;
        this.$emit("sendTotal", total);
      },
      deep: true,
    },
  },
  created() {
    // console.log("qwe");
  },
};
</script>

<style scoped>
.van-submit-bar {
  bottom: 50px;
}

/deep/.van-nav-bar__title {
  color: white !important;
  font-size: 18px;
}
/deep/.van-nav-bar .van-icon {
  color: white;
}

/deep/.van-nav-bar__text {
  color: white;
}

/deep/.van-nav-bar {
  background-color: #4dd64d;
}
</style>
