<template>
  <div id="disposit">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="存入账户" v-model="cardno" :disabled="true">
        </el-input>
        <el-input v-model="money" placeholder="存款金额"></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
        <el-button type="primary" plain @click="disposit">action</el-button>
      </el-col></el-row
    >
  </div>
</template>

<script>
import qs from "qs";
import { getMoney } from "@/api/common";
export default {
  data() {
    return {
      cardno: "",
      password: "",
      money: "",
    };
  },

  created() {
    var id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: id,
    };
    var data = qs.stringify(params);
    this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getCardNo", data)
      .then((res) => {
        this.cardno = res.data;
      });
  },

  methods: {
    disposit() {
      if (
        this.password.trim() ==
          JSON.parse(sessionStorage.getItem("user")).password &&
        this.money.trim() > 0
      ) {
        this.money = this.money.trim();

        var id = JSON.parse(sessionStorage.getItem("user")).id;
        var params = {
          cardno: this.cardno,
          money: this.money,
          id: id,
        };
        var data = qs.stringify(params);
        var _this = this;
        this.$axios
          .post("http://127.0.0.1:8080/BankTransfer/disposit", data)
          .then(
            function(res) {
              console.log(res.data);
              this.$message({
                showClose: true,
                message: "存款成功",
                type: "success",
              });
              getMoney(this);
              this.$router.push("/bill");
            }.bind(_this)
          )
          .catch((err) => {
            this.$message({
              showClose: true,
              message: "请重试",
              type: "error",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请重试",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
