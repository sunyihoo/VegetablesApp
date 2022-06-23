<template>
  <div>
    <van-row>
      <div class="title">{{ goodsinfo.title }}</div>
      <div class="desc">{{ goodsinfo.desc }}</div>
    </van-row>
    <van-row type="flex" justify="space-between" class="bottom">
      <van-col span="12" class="price"> ￥{{ goodsinfo.price }}/份 </van-col>
      <van-col offset="4" span="8" style="text-align: center">
        <van-icon
          name="cart-o"
          color="#4dd64d"
          size="25px"
          :badge="num"
          @click.stop="addCart"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { get, set } from "../components/util";

export default {
  name: "GoodsShow",
  data() {
    return {
      num: "",
      cartList: [],
    };
  },
  props: {
    goodsinfo: {
      type: Object,
    },
    type: {},
  },
  components: {},
  methods: {
    addCart: function () {
      if (this.num == "") {
        this.num = 1;
      } else {
        if (this.num == 5) {
          this.$toast("该商品每单限购5件");
          return;
        } else {
          this.num++;
        }
      }
      let cart = {};
      cart.type = this.type;
      cart.num = this.num;
      cart.id = this.goodsinfo.id;
      cart.checked = true;
      // console.log(cart);
      this.cartList = get();
      var tags = this.cartList.filter((e) => {
        if (e.type == this.type && e.id == this.goodsinfo.id) return true;
        else return false;
      });
      // console.log(tags);
      if (tags.length < 1) {
        this.cartList.splice(0, 0, cart);
      } else {
        this.cartList.forEach((e) => {
          // console.log(e.type == this.type, e.id == this.goodsinfo.id);
          if (e.type == this.type && e.id == this.goodsinfo.id) {
            e.num = this.num;
            e.checked = true;
          }
        });
      }
      set(this.cartList);
    },
  },
  mounted() {
    this.cartList = get();
    this.cartList.forEach((e) => {
      if (e.type == this.type && e.id == this.goodsinfo.id) {
        this.num = e.num;
      }
    });
  },
  // watch(){
  //   'num':
  // }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  margin-top: 5px;
  font-weight: bolder;
  text-align: left;
}
.desc {
  font-size: 12px;
  color: #14a817;
  text-align: left;
  margin-top: 10px;
}

.price {
  color: red;
}

.bottom {
  margin-top: 15px;
  margin-bottom: 1px;
}
</style>
