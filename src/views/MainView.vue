<template>
  <div class="home">
    <Header v-show="showHeader"></Header>
    <router-view
      @updateAvtive="recvActive"
      @sendTotal="recvTotal"
    ></router-view>
    <van-tabbar v-model="active" placeholder>
      <van-tabbar-item
        :to="item.address"
        v-for="(item, index) in tablist"
        :key="index"
        :icon="item.icon"
        :badge="index == 2 ? total : ''"
      >
        {{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import Header from "../components/TheHeader.vue";

export default {
  name: "MainView",
  data() {
    return {
      active: 0,
      img: require("@/assets/logo.png"),
      total: "",
      tablist: [
        {
          name: "首页",
          address: "/main/home",
          icon: "home-o",
        },
        {
          name: "所有商品",
          address: "/main/goods",
          icon: "apps-o",
        },
        {
          name: "购物车",
          address: "/main/cart",
          icon: "shopping-cart-o",
        },
        {
          name: "我的",
          address: "/main/mine",
          icon: "contact",
        },
      ],
    };
  },
  methods: {
    recvActive() {
      this.active = 1;
    },
    recvTotal(val) {
      console.log(val);
      this.total = val;
    },
  },
  components: {
    Header,
  },
  computed: {
    showHeader: function () {
      if (this.active == 2 || this.active == 3) return false;
      else return true;
    },
  },
  mounted() {
    this.tablist.forEach((e, index) => {
      if (e.address == this.$route.path) {
        this.active = index;
        return;
      }
    });
    console.log(this.$route.path);
  },
  watch: {},
};
</script>
