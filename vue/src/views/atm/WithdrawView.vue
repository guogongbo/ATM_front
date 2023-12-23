<template>
  <div class="main">
    <div class="left">
      <div class="buttonDistance">
        <el-button plain @click="withdraw(100)">100</el-button>
      </div>
      <div class="buttonDistance">
        <el-button plain @click="withdraw(200)">200</el-button>
      </div>
      <div class="buttonDistance">
        <el-button plain @click="withdraw(500)">500</el-button>
      </div>
      <div class="buttonDistance">
        <el-button plain @click="withdraw(1000)">1000</el-button>
      </div>
    </div>
    <div class="center">
      <h1>请选择取款金额</h1>
    </div>
    <div class="right">
      <div class="buttonDistance">
        <router-link to="/WithdrawInput"
          ><el-button>输入金额</el-button></router-link
        >
      </div>
      <div class="buttonDistance">
        <router-link to="/OperationView"
          ><el-button>返回</el-button></router-link
        >
      </div>
      <div class="buttonDistance">
        <router-link to="/TakeCard"><el-button>退卡</el-button></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { getMoney } from "@/api/common";
import jsCookie from "js-cookie";
let sumqumoney = 0;
let sumzhuanmoney = 0;

export default {
  data() {
    return {
      money: "",
      cardno: jsCookie.get("cardnumber"),
      password: jsCookie.get("password"),
    };
  },

  created() {
    var id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: id,
    };
    var data = qs.stringify(params);
    // this.$axios
    //   .get("http://127.0.0.1:8080/BankTransfer/getCardNo?"+ data)
    //   .then((res) => {
    //     this.cardno = res.data;
    //   });

    this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getRecords", data)
      .then((res) => {
        this.dealResponse(res.data);
      });
  },

  methods: {

    dealResponse(arr) {
      sumqumoney = 0;
      sumzhuanmoney = 0;
      for (let o of arr) {
        let to = {};
        to.record_id = o.id;
        to.cardno = o.card.cardno;
        to.amount = o.amount;
        to.type = o.type;
        if (o.type == 0) {
          to.type = "转账支出";
        } else if (o.type == 1) {
          to.type = "存入";
        } else {
          to.type = "取款支出";
        }
        to.date = 123;
        var d = new Date(o.date);
        to.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        let date = new Date();
        if(d.getFullYear() == date.getFullYear()&&d.getMonth() == date.getMonth()&&d.getDate() == date.getDate()){
          if(o.type == 2){
            sumqumoney += o.amount;
            console.log("今日取款" + sumqumoney);
          }
          if(o.type == 0){
            sumzhuanmoney += o.amount;
            console.log("今日转款" + sumzhuanmoney);
          }
        }
      }
    },

    withdraw(qumoney) {
      var id = JSON.parse(sessionStorage.getItem("user")).id;
      var params = {
        id: id,
      };
      var data = qs.stringify(params);

      this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getRecords", data)
      .then((res) => {
        this.dealResponse(res.data);
      });

      if (
        this.password.trim() ==
        JSON.parse(sessionStorage.getItem("user")).password
      ) {
        this.money = qumoney;
        if(sumqumoney + parseInt(this.money) > 20000) {
          
          this.$message({
            
            showClose: true,
            message: "取款金额超过今日限额2000,无法取款,请重试",
            type: "warning",
          });
          return;
        }
        if (this.$store.state.money - this.money < 0) {
          this.$message({
            showClose: true,
            message: "余额不足",
            type: "warning",
          });
        }
        else{
          var id = JSON.parse(sessionStorage.getItem("user")).id;
          var params = {
            cardno: this.cardno,
            money: this.money,
            id: id,
          };
          var data = qs.stringify(params);
          console.log(data + "-----" + jsCookie.get("cardnumber"));
          var _this = this;
          this.$axios
            .get("http://127.0.0.1:8080/BankTransfer/withdraw?" + data)
            .then(
              function (res) {
                console.log(res.data);
                this.$message({
                  showClose: true,
                  message: "取款成功",
                  type: "success",
                });
                getMoney(this); 
                jsCookie.set("type", "取款");
      jsCookie.set("transactionDetail", this.money);
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
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 780px;
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
.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}
</style>