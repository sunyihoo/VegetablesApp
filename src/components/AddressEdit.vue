<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import { setAddress, getAddress } from "../components/util";

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressList: [],
    };
  },
  methods: {
    onSave(info) {
      Toast("save");
      let address = {};
      address["id"] = this.addressList.length;
      address["name"] = info.name;
      address["tel"] = info.tel;
      address["address"] =
        info.province + info.city + info.county + info.addressDetail;
      address["isDefault"] = info.isDefault;
      // console.log(address);
      var tags = this.addressList.filter((e) => {
        if (e == address) return true;
        else return false;
      });
      // console.log(tags);
      if (tags.length >= 1) {
        Toast("该地址已存在");
        return;
      } else {
        if (info.isDefault) {
          this.addressList.forEach((e) => {
            e.isDefault = false;
          });
        }
      }
      this.addressList.splice(0, 0, address);
      // console.log(this.addressList);
      setAddress(this.addressList);
      this.$router.go(-1);
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  mounted() {
    this.addressList = getAddress();
  },
};
</script>

<style scoped>
</style>
