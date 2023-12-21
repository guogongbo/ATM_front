<template>
  <div class="main">
  <div class="left"><div class="buttonDistance"><el-button plain @click="withdraw(100)" >100</el-button></div>
      <div class="buttonDistance"><el-button plain @click="withdraw(200)">200</el-button></div>
      <div class="buttonDistance"><el-button plain @click="withdraw(500)">500</el-button></div>
      <div class="buttonDistance"><el-button plain @click="withdraw(1000)">1000</el-button></div>
  </div>
  <div class="center"><h1>请选择取款金额</h1></div>  
  <div class="right"><div class="buttonDistance"><router-link to="/WithdrawInput"><el-button>输入金额</el-button></router-link></div>
      <div class="buttonDistance"><router-link to="/OperationView"><el-button>返回</el-button></router-link></div>
       <div class="buttonDistance"> <router-link to="/TakeCard"><el-button>退卡</el-button></router-link></div>
        </div>
    </div>
</template>
<script>
   import qs from "qs";
import { getMoney } from "@/api/common";
import jsCookie from 'js-cookie';

export default {
  data() {
    return {
      money:'',
      cardno: jsCookie.get('cardnumber'),
      password: jsCookie.get('password'),
    };
  },

  created() {
    var id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: id,
    }
    var data = qs.stringify(params);
    this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getCardNo", data)
      .then((res) => {
        this.cardno = res.data;
      });
  },

  methods: {
    withdraw(qumoney) {
      if (
        this.password.trim() ==
          JSON.parse(sessionStorage.getItem("user")).password
      ) {
        this.money = qumoney;
        if (this.$store.state.money - this.money < 0) {
          this.$message({
            showClose: true,
            message: "余额不足",
            type: "warning",
          });
        } else{
                  var id = JSON.parse(sessionStorage.getItem("user")).id;
        var params = {
          cardno: this.cardno,
          money: this.money,
          id: id,
        };
        var data = qs.stringify(params);
        var _this = this;
        this.$axios
          .post("http://127.0.0.1:8080/BankTransfer/withdraw", data)
          .then(
            function(res) {
              console.log(res.data);
              this.$message({
                showClose: true,
                message: "取款成功",
                type: "success",
              });
              getMoney(this);
              this.$router.push("/WithdrawSuccess");
            }.bind(_this)
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
};

</script>
<style >
.main{
  display:flex;
  justify-content: space-between;
  width: 100%;
  height: 750px;
   background: url("../../assets/中国银行图片.png")  no-repeat center fixed;
          background-size: cover;
}
.left{
  padding-top: 300px;
    box-sizing: border-box;
  width:300px;
  height:750px;

}
.center{
  padding-top: 50px;
    box-sizing: border-box;
  width:900px;
  height:750px;
  text-align: center;
}
.right{
  padding-top: 300px;
  box-sizing: border-box;
  text-align: right;
  width:300px;
  height:750px;
  
}
.buttonDistance{
  padding-top:20px;
  box-sizing: border-box;
}
</style>