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
        <br> <br><br>
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
var sumzhuanmoney = 0;
export default {
  data() {
    return {
      toAccount: jsCookie.get("transfercard"),
      money:"",
      password: jsCookie.get("password"),
      cardno: jsCookie.get("cardnumber"),
      cansubmit: false,
      id: "",
    };
  },
  methods: {
     dealResponse(arr) {
      sumzhuanmoney=0;
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
           if(o.type == 0){
            sumzhuanmoney += o.amount;
            console.log("今日转款" + sumzhuanmoney);
          }
        }
      }
    },

    transfer() {
      var id = JSON.parse(sessionStorage.getItem("user")).id;
      var params = {
        id: id,
      };
      var data = qs.stringify(params);
      this.$axios
      .post("http://8.139.5.168:8080/BankTransfer/getRecords", data)
      .then((res) => {
        this.dealResponse(res.data);
      });
      console.log(this.toAccount);
      console.log(this.money);
      console.log(this.password);
      console.log(this.cardno);
      this.cansubmit = true;
      if (
        JSON.parse(sessionStorage.getItem("user")).password ==
          this.password.trim() && this.cansubmit && this.money > 0
      ) {
        if(this.money>50000){
           this.$message({
            showClose: true,
            message: "单笔转账金额不能大于50000，无法转账，请重试",
            type: "warning",
          });
          return;
        }
         if(sumzhuanmoney + parseInt( this.money) > 50000){
          console.log((sumzhuanmoney+parseInt( this.money))+"!");
          this.$message({
            showClose: true,
            message: "单日转账金额不能大于50000，无法转账，请重试",
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
        } else {
          var params = {
            toAccount: this.toAccount.trim(),
            money: this.money.trim(),
            cardno: this.cardno,
            id: this.id,
          };
          var data = qs.stringify(params);
          this.$axios
            .post("http://8.139.5.168:8080/BankTransfer/transfer", data)
            .then(
              function (res) {
                console.log(res);
                this.$message({
                  showClose: true,
                  message: "转账成功",
                  type: "success",
                });
      jsCookie.set("transactionDetail", this.money);
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
          message: "转账金额不能为0",
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
   /*  this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getCardNo", data)
      .then((res) => {
        this.cardno = res.data;
      }); */
       this.$axios
      .post("http://8.139.5.168:8080/BankTransfer/getRecords", data)
      .then((res) => {
        this.dealResponse(res.data);
      });
  },
};
</script>
<style>
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