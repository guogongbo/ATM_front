<template>
  <div class="main">
    <div class="left">
      <div class="buttonDistance">
        <router-link to="/DepositView1"><el-button>继续放钞</el-button></router-link>
      </div>
    </div>
    <div class="center">
      <div><h1>您累计放入的钞票明细如下，请选择是否继续放钞？</h1></div>
      <br> <br> <br> <br> <br> <br> 
      <div>
        <table class="table1" border="1" cellspacing="0">
          <th>面值</th>
          <th>张数</th>
          <th>金额</th>
          <tr>
            <td>100</td>
            <td>{{money/100}}</td>
            <td>{{money}}</td>
          </tr>
        </table>
        
      </div>
    </div>
    <div class="right">
      <div class="buttonDistance">
          <el-button plain @click="disposit">结束放钞</el-button>
      </div>
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
      cardno: jsCookie.get('cardnumber'),
      password: jsCookie.get('password'),
      money: jsCookie.get('cash'),
    };
  },

  created() {
    var id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: id,
    };
    var data = qs.stringify(params);
   /*  this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getCardNo", data)
      .then((res) => {
        this.cardno = res.data;
      }); */
  },

  methods: {
    disposit() {
      if (
        this.password.trim() ==
          JSON.parse(sessionStorage.getItem("user")).password &&
        this.money.trim() > 0
      ) {
        this.money = this.money.trim();
         jsCookie.set("type", "存款");
      jsCookie.set("transactionDetail", this.money);
        var id = JSON.parse(sessionStorage.getItem("user")).id;
        var params = {
          cardno: this.cardno,
          money: this.money,
          id: id,
        };
        var data = qs.stringify(params);
        var _this = this;
        this.$axios
          .post("http://8.139.5.168:8080/BankTransfer/disposit", data)
          .then(
            function(res) {
              console.log(res.data);
              this.$message({
                showClose: true,
                message: "存款成功",
                type: "success",
              });
              getMoney(this);
              this.$router.push("/TransactionSuccess1");
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

<style >
.table1{
  text-align: center;
  width:100%;
  font-size: 40px;
  background-color:white;

}
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
.table {
  text-align: center;
}
.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}

</style>