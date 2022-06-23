<template>
  <div>
    <nav-bar title="设置"></nav-bar>
    <van-cell-group>
      <van-cell is-link value="修改密码" @click="(show = true), (idx = 0)">
      </van-cell>
      <van-cell is-link value="修改用户名" @click="(show = true), (idx = 1)">
      </van-cell>
      <van-cell is-link value="更改手机号" @click="(show = true), (idx = 2)">
      </van-cell>
      <van-cell is-link value="注销账号" @click="del"> </van-cell>
    </van-cell-group>
    <van-popup
      v-model="show"
      round
      position="center"
      :style="{ height: '50%', width: '90%' }"
    >
      <div class="pop">
        <div v-show="idx == 0" class="pop1">
          <van-field
            v-model="prepasswd"
            center
            clearable
            label="原密码："
            placeholder="请输入原密码"
          >
          </van-field>
          <van-field
            v-model="newpasswd1"
            center
            clearable
            label="新密码："
            placeholder="请输入新密码"
          >
          </van-field>
          <van-field
            v-model="newpasswd2"
            center
            clearable
            label="再次新密码："
            placeholder="请再次输入新密码"
          >
          </van-field>
          <van-button type="primary" size="large" @click="updatepasswd"
            >确定</van-button
          >
        </div>
        <div v-show="idx == 1" class="pop1">
          <van-field
            v-model="newusername"
            center
            clearable
            label="新的用户名："
            placeholder="请输入新的用户名"
          >
          </van-field>
          <van-button type="primary" size="large" @click="updateusername"
            >确定</van-button
          >
        </div>
        <div v-show="idx == 2" class="pop1">
          <van-field
            v-model="newphone"
            center
            clearable
            label="手机号："
            placeholder="请输入手机号："
          >
          </van-field>

          <van-button type="primary" size="large" @click="updatephone"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "SettingInfo",
  data() {
    return {
      show: false,
      idx: 0,
      newphone: "",
      newpasswd1: "",
      newpasswd2: "",
      prepasswd: "",
      newusername: "",
      userlist: [],
      currentuser: "",
    };
  },
  components: { NavBar },
  methods: {
    del() {
      this.$dialog
        .alert({
          showCancelButton: true,
          message: "确认删除账号？",
        })
        .then(() => {
          // on close
          this.userlist.forEach((user, idx) => {
            if (user.username == this.currentuser.username) {
              this.userlist.splice(idx, 1);
            }
          });
          this.$toast.success("注销成功");
          localStorage.setItem("user", JSON.stringify(this.userlist));
        })
        .catch(() => {
          // on cancel
        });
    },
    updatepasswd() {
      if (this.currentuser.password != this.prepasswd) {
        this.$toast.fail("原密码错误");
        return;
      } else if (this.newpasswd1 != this.newpasswd2) {
        this.$toast.fail("两次密码不一样");
        return;
      }
      this.userlist.forEach((e) => {
        if (e.username == this.currentuser.username) {
          e.password = this.newpasswd2;
        }
      });
      localStorage.setItem("user", JSON.stringify(this.userlist));
      this.$toast.success("修改密码成功");
      this.show = false;
    },
    updateusername() {
      this.userlist.forEach((e) => {
        if (e.username == this.currentuser.username) {
          e.username = this.newusername;
        }
      });
      localStorage.setItem("user", JSON.stringify(this.userlist));
      this.$toast.success("修改用户名成功");
      this.show = false;
    },
    updatephone() {
      this.userlist.forEach((e) => {
        if (e.username == this.currentuser.username) {
          e.phone = this.newphone;
        }
      });
      localStorage.setItem("user", JSON.stringify(this.userlist));
      this.$toast.success("修改用户名成功");
      this.show = false;
    },
  },
  mounted() {
    this.userlist = JSON.parse(localStorage.getItem("user"));
    this.currentuser = JSON.parse(localStorage.getItem("currentuser"));
  },
};
</script>

<style scoped>
.pop {
  margin-top: 80px;
  padding: auto 10px;
}
.pop1 .van-field {
  margin: 10px 10px;
  padding: 10px;
}
.van-button {
  padding: 10px 10px;
}
</style>
