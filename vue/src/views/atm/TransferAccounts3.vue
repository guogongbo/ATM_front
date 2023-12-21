<template>
  <form action="">
    <div class="main">
      <div class="left">
        <div class="buttonDistance">
          <router-link to="/OperationView"><el-button>返回</el-button></router-link>
        </div>
      </div>
      <div class="center">
        <h1>转入账号为：{{ toAccount }}</h1>
        <el-input placeholder="请输入转账金额" v-model="money"></el-input>
      </div>
      <div class="right">
        <div class="buttonDistance">
          <el-button plain @click="transfer">确认</el-button>
        </div>
        <div class="buttonDistance">
          <el-button native-type="reset">更改</el-button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import qs from "qs";
import { getMoney } from "@/api/common";
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      toAccount: jsCookie.get("transfercard"),
      money: this.money,
      password: jsCookie.get("password"),
      cardno: jsCookie.get("cardnumber"),
      cansubmit: false,
      id: "",
    };
  },
  methods: {
    transfer() {
      console.log(this.toAccount);
      console.log(this.money);
      console.log(this.password);
      console.log(this.cardno);
      this.cansubmit = true;
      if (
        JSON.parse(sessionStorage.getItem("user")).password ==
          this.password.trim() && this.cansubmit && this.money > 0
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
              function (res) {
                console.log(res);
                this.$message({
                  showClose: true,
                  message: "转账成功",
                  type: "success",
                });
                getMoney(this);
                this.$router.push("/TransactionSuccess");
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
<style>
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 750px;
  background: url("../../assets/中国银行图片.png") no-repeat center fixed;
  background-size: cover;
}
.left {
  padding-top: 300px;
  box-sizing: border-box;
  width: 300px;
  height: 750px;
}
.center {
  padding-top: 50px;
  box-sizing: border-box;
  width: 900px;
  height: 750px;
  text-align: center;
}
.right {
  padding-top: 300px;
  box-sizing: border-box;
  text-align: right;
  width: 300px;
  height: 750px;
}
.buttonDistance {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>