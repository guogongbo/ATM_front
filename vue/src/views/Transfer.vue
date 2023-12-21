<template>
  <div id="transfer">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="我的账户" v-model="cardno" :disabled="true">
        </el-input>
        <el-input
          v-model="toAccount"
          placeholder="转出账户"
          @blur="TransferToAccount"
        ></el-input>
        <el-input v-model="money" placeholder="转出金额"></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
        <el-button type="primary" plain @click="transfer">action</el-button>
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
      toAccount: "",
      money: "",
      password: "",
      cardno: "",
      cansubmit: false,
      id: "",
    };
  },
  methods: {
    TransferToAccount() {
      var params = {
        toAccount: this.toAccount,
      };
      var data = qs.stringify(params);
      this.$axios
        .post("http://127.0.0.1:8080/BankTransfer/getToAccount", data)
        .then((res) => {
          var len = res.data.length;
          if (len > 0) {
            if (
              res.data == JSON.parse(sessionStorage.getItem("user")).realname
            ) {
              this.$message.error(`不可以给自己转账哦`);
              this.cansubmit = false;
            } else {
              this.$message(
                `转入账户真实名字：${"*".repeat(len - 2)}${res.data.substr(
                  len - 2,
                  2
                )}`
              );
              this.cansubmit = true;
            }
          } else {
            this.$message.error(`转出账户不存在`);
            this.cansubmit = false;
          }
        });
    },
    transfer() {
      if (
        JSON.parse(sessionStorage.getItem("user")).password ==
          this.password.trim() &&
        this.cansubmit &&
        this.money > 0
      ) {
        if (this.$store.state.money - this.money < 0) {
          this.$message({
            showClose: true,
            message: "余额不足",
            type: "warning",
          });
        } else {
          var params = {
            toAccount: this.toAccount.trim(),
            money: this.money.trim(),
            cardno: this.cardno,
            id: this.id,
          };
          var data = qs.stringify(params);
          this.$axios
            .post("http://127.0.0.1:8080/BankTransfer/transfer", data)
            .then(
              function(res) {
                console.log(res);
                this.$message({
                  showClose: true,
                  message: "转账成功",
                  type: "success",
                });
                getMoney(this);
                this.$router.push("/bill");
              }.bind(this)
            )
            .catch((err) => {
              this.$message({
                showClose: true,
                message: "请重试",
                type: "error",
              });
            });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请重试",
          type: "error",
        });
      }
    },
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: this.id,
    };
    var data = qs.stringify(params);
    this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getCardNo", data)
      .then((res) => {
        this.cardno = res.data;
      });
  },
};
</script>

<style></style>
