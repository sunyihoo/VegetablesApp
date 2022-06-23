<template>
  <div>
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="忘记密码"
      @click-left="goBack"
    ></van-nav-bar>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >请输入用户名</van-divider
    >
    <div class="content">
      <van-field
        v-model="username"
        center
        clearable
        label="用户名："
        placeholder="请输入要查询的用户名"
      >
        <template #button>
          <van-button size="small" type="primary" @click="query"
            >查询</van-button
          >
        </template>
      </van-field>
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >查询结果</van-divider
    >
  </div>
</template>

<script>
export default {
  name: "ForgetPasswd",
  data() {
    return {
      user: [],
      username: "",
      passwd: "",
    };
  },
  components: {},
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
    query() {
      const result = this.user.filter((e) => {
        if (e.username == this.username) return true;
        else return false;
      });
      if (result.length >= 1) {
        this.$toast({
          message: "您的密码为" + result[0].password,
          icon: "like-o",
        });
      } else {
        this.$toast.fail("未查询到该用户");
      }
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user == null) {
      return;
    } else {
      this.user = user;
    }
  },
};
</script>

<style scoped>
.content {
  margin: 20px auto;
}
</style>
