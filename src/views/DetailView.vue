<template>
  <div>
    <NavBar title="详情"></NavBar>
    <div>
      <van-image width="100%" height="300px" :src="goodsinfo.imgUrl">
      </van-image>
    </div>
    <div class="center">
      <van-cell-group>
        <van-cell>
          <van-row type="flex" justify="space-between">
            <van-col span="6"> ￥{{ goodsinfo.price }} /份 </van-col>
            <van-col span="16" style="text-align: right">
              <van-icon name="location-o" color="#4dd64d" />
              原产地：{{ goodsinfo.orign }}
            </van-col>
          </van-row>
        </van-cell>
        <van-cell
          :title="goodsinfo.title"
          :label="goodsinfo.detail"
          style="text-align: left"
        />
        <van-cell>
          <van-row
            type="flex"
            justify="space-around"
            style="text-align: center"
          >
            <van-col span="6">
              <div>{{ goodsinfo.condition }}</div>
              <div>存储条件</div>
            </van-col>
            <van-col
              span="6"
              v-for="(item, index) in goodsinfo['desc']
                ? goodsinfo['desc'].split('|')
                : goodsinfo['desc']"
              :key="index"
            >
              <div>{{ item }}</div>
              <div>推荐理由</div>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <div>
        <van-goods-action>
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
            @click="onClickIcon"
          />
          <van-goods-action-icon
            icon="star-o"
            text="收藏"
            @click="onClickIcon"
          />
          <van-goods-action-button
            type="primary"
            text="加入购物车"
            @click="onClickButton"
          />
        </van-goods-action>
      </div>
    </div>
    <div class="detail">
      <van-field
        readonly
        label="净含量"
        v-model="goodsinfo.content"
      ></van-field>
      <van-field
        readonly
        label="保存条件"
        v-model="goodsinfo.condition"
      ></van-field>
      <van-field readonly label="产地" v-model="goodsinfo.orign"></van-field>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import goodsList from "../components/data";

import { get, set } from "../components/util";

export default {
  name: "DetailView",
  data() {
    return {
      tel: "123",
      CartList: [],
      goodsinfo: {},
      type: this.$route.query.type,
      id: this.$route.query.id,
    };
  },
  components: { NavBar },
  methods: {
    onClickIcon: function () {},
    onClickButton: function () {
      let cart = {};
      cart.type = this.type;
      cart.num = 1;
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
        this.$toast("已加入购物车，当前菜品购物车数量为" + cart.num);

        this.cartList.splice(0, 0, cart);
      } else {
        this.cartList.forEach((e) => {
          // console.log(e.type == this.type, e.id == this.goodsinfo.id);
          if (e.type == this.type && e.id == this.goodsinfo.id) {
            e.num++;
            this.$toast("已加入购物车，当前菜品购物车数量为" + e.num);
            if (e.num > 5) {
              this.$toast.fail("限购数量为5");
              e.num = 5;
            }
            e.checked = true;
          }
        });
      }
      set(this.cartList);
    },
  },
  mounted() {
    this.CartList = get();
    goodsList.forEach((e) => {
      if (e.type == this.type) {
        this.goodsinfo = e["info"][this.id];
        return;
      }
    });
    // console.log(this.goodsinfo);
  },
};
</script>

<style scoped>
.center {
  margin: 10px 5px;
}
.detail {
  margin: 10px 5px;
}
</style>
