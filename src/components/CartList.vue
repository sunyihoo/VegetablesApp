<template>
  <div class="content">
    <van-swipe-cell style="background-color: white">
      <van-row type="flex" justify="space-around">
        <van-col span="4" class="radio">
          <van-checkbox
            v-model="checked"
            checked-color="rgb(47 212 76)"
          ></van-checkbox>
        </van-col>
        <van-col span="20">
          <van-card
            :price="goodsInfo.price"
            :title="goodsInfo.title"
            class="goods-card"
            :thumb="goodsInfo.imgUrl"
          >
            <template #bottom>
              <div class="stepper">
                <van-stepper
                  v-model="value"
                  max="5"
                  @change="add"
                  disable-input
                />
              </div>
            </template>
          </van-card>
        </van-col>
      </van-row>

      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="del"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import goodsList from "../components/data";
import { get, set } from "../components/util";

export default {
  name: "CartList",
  data() {
    return {
      goodsInfo: {},
      checked: this.info.checked,
      imgUrl: require("@/assets/img/goods/goods1.jpg"),
      value: this.info.num ? this.info.num : 0,
    };
  },
  components: {},
  methods: {
    add() {
      let cartList = get();
      cartList.forEach((e) => {
        if (e.type == this.info.type && e.id == this.info.id) {
          e.num = this.value;
          e.checked = this.checked;
        }
      });
      set(cartList);
      this.$emit("sendmsg", cartList);
    },
    del() {
      console.log("删除");
      let cartList = get();
      cartList.forEach((e, idx) => {
        // console.log(e, idx);
        if (e.type == this.info.type && e.id == this.info.id) {
          console.log(e, idx);
          cartList.splice(idx, 1);
        }
      });
      set(cartList);
      this.$router.go(0);
      this.$emit("sendmsg", cartList);
    },
  },
  props: {
    num: {},
    info: {
      type: Object,
    },
    allchecked: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    checked: function () {
      this.add();
    },
    allchecked: function () {
      this.checked = this.allchecked;
    },
  },
  computed: {},
  mounted() {
    goodsList.forEach((e) => {
      if (e.type == this.info.type) {
        this.goodsInfo = e.info[this.info.id];
      }
    });
  },
};
</script>

<style scoped>
.bottom {
  margin-top: 50px;
}
.radio {
  margin-top: 40px;
  justify-content: space-evenly;
}

.goods-card {
  margin: 0;
  background-color: white;
  font-size: 19px;
}

.van-card__title {
  max-height: 50px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  margin-left: 10px;
}

.delete-button {
  height: 100%;
}

.van-checkbox {
  justify-content: space-evenly;
}

.content {
  margin: 10px auto;
}
.van-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.van-card__price {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  font-size: 18px;
  color: red;
}
.van-card__price-integer {
  font-size: 18px;
}
.stepper {
  flex: 1;
}
</style>
