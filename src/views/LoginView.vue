<template>
  <div class="lay">
    <van-image
      :src="imgList[0]"
      width="100"
      height="100"
      round
      style="margin-bottom: 20px"
    >
    </van-image>
    <van-tabs v-model="active" style="margin: auto 8px">
      <van-tab title="登录">
        <van-form @submit="onSubmit" style="border-radius: 25px">
          <van-field
            v-model="loginItem.username"
            left-icon="user-o"
            required
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            class="bottom"
            v-model="loginItem.password"
            required
            clearable
            :left-icon="passwdimg"
            right-icon="eye-o"
            :type="!passwordStatus ? 'password' : 'text'"
            @click-right-icon="passwordStatus = !passwordStatus"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-row type="flex" justify="space-between">
            <van-col offset="1" span="6" class="forgetSecert">
              <van-checkbox v-model="loginItem.remember">记住密码</van-checkbox>
            </van-col>
            <van-col span="6" class="forgetSecert" @click="onForget">
              忘记密码?
            </van-col>
          </van-row>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
              padding: '0 16px',
            }"
            >第三方登录</van-divider
          >
          <van-row type="flex" justify="space-around">
            <van-col span="6">
              <van-image :src="imgList[1]"></van-image>
            </van-col>
            <van-col span="6">
              <van-image :src="imgList[2]"></van-image>
            </van-col>
            <van-col span="6">
              <van-image :src="imgList[3]"></van-image>
            </van-col>
          </van-row>
        </van-form>
      </van-tab>
      <van-tab title="注册">
        <van-form @submit="onRegister">
          <van-field
            v-model="registerItem.username"
            left-icon="user-o"
            required
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="registerItem.password"
            required
            clearable
            :left-icon="passwdimg"
            type="text"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            class="bottom"
            v-model="registerItem.phone"
            required
            clearable
            :left-icon="passwdimg"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />

          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Notify } from "vant";
export default {
  name: "LoginView",
  data() {
    return {
      active: 0,
      checked: false,
      user: [],
      passwordStatus: false,
      imgList: [
        require("@/assets/img/login.jpg"),
        require("@/assets/img/login/微信.png"),
        require("@/assets/img/login/QQ.png"),
        require("@/assets/img/login/微博.png"),
      ],
      passwdimg: require("@/assets/img/login/passwd.png"),
      loginItem: {
        remember: false,
        username: "",
        password: "",
        phone: "",
      },
      registerItem: {
        username: "",
        password: "",
        phone: "",
        remember: false,
      },
    };
  },
  components: {},
  methods: {
    onSubmit: function () {
      // console.log(this.loginItem);
      for (var i = 0; i < this.user.length; i++) {
        if (
          this.user[i].username == this.loginItem.username &&
          this.user[i].password == this.loginItem.password
        ) {
          if (this.loginItem.remember) {
            this.user[i].remember = true;
            // console.log(this.user);
            this.loginItem.phone = this.user[i].phone;
            localStorage.setItem("user", JSON.stringify(this.user));
          } else {
            this.user[i].remember = false;
            console.log(this.user);
            this.loginItem.phone = this.user[i].phone;
            localStorage.setItem("user", JSON.stringify(this.user));
          }
          localStorage.setItem("currentuser", JSON.stringify(this.loginItem));
          Toast({
            message: "登录成功",
          });
          this.$router.push("/main");
          return;
        }
      }
      Notify({ type: "danger", message: "账号或密码错误" });
    },
    onRegister: function () {
      console.log(this.registerItem);
      const tag = this.user.filter((e) => {
        if (e.username == this.registerItem.username) {
          return true;
        } else return false;
      });
      // console.log(tag);

      if (tag.length >= 1) {
        Toast.fail("该用户已存在！");
        return;
      } else {
        this.user.splice(0, 0, this.registerItem);
        localStorage.setItem("user", JSON.stringify(this.user));
        Toast.loading({
          duration: 500,
          message: "注册成功，转入登录页面",
          forbidClick: true,
          loadingType: "spinner",
        });
        setTimeout(() => {
          this.active = 0;
        }, 500);
      }
    },
    onForget() {
      this.$router.push("/forget");
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user == null) {
      return;
    } else {
      this.user = user;
    }
  },
  watch: {
    "loginItem.username": {
      handler: function () {
        for (var i = 0; i < this.user.length; i++) {
          if (
            this.user[i].username == this.loginItem.username &&
            this.user[i].remember == true
          ) {
            this.loginItem = this.user[i];
          }
        }
      },
    },
  },
};
</script>


<style scoped>
.forgetSecert {
  text-align: right;
  margin-top: 10px;
  margin-right: 30px;
}
.lay {
  margin-top: 200px;
}

/deep/.van-tabs--line .van-tabs__wrap {
  border-radius: 25px 25px 0 0;
}

.bottom {
  border-radius: 0 0 25px 25px;
}
.van-cell {
  padding: 18px 21px;
}
</style>
