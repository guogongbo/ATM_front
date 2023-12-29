<template>
  <div class="main">
    <div class="left"><div class="buttonDistance"><router-link to="/OperationView"><el-button> 返回</el-button></router-link></div></div>
    <div class="center">
      <h1>请将要存的现金放入存款槽</h1>
      <br> <br><br>
      <el-input v-model="money" placeholder="存款金额"></el-input>
    </div>
    <div class="right">
      <div class="buttonDistance">
          <el-button @click="cashsubmit">存放完成，点钞</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
import qs from "qs";
let sumcunmoney=0;
export default {
  data() {    
    return {
      money: "",
    }    
  },
  methods: {
         dealResponse(arr) {
      sumcunmoney=0;
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
           if(o.type == 1){
            sumcunmoney += o.amount;
            console.log("今日存款" + sumcunmoney);
          }
        }
      }
    },
    cashsubmit(){
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
      if(this.money==""){
         this.$message({
          showClose: true,
          message: "存款不能为0",
          type: "warning",
      })}
      else{
       if(this.money>10000){
        this.$message({
          showClose: true,
          message: "存款单笔限额10000，无法存款，请重试",
          type: "warning",
        });
        return;
      }
       if(sumcunmoney+parseInt(this.money)>50000){
         this.$message({
          showClose: true,
          message: "存款单日限额50000，无法存款，请重试",
          type: "warning",
        });
        return;
      }
       if(this.money%100==0){
      jsCookie.set('cash',this.money);
      console.log(jsCookie.get('cash'));
       this.$router.push({ path: "../DepositView2" });
       }
      else{
         this.$message({
          showClose: true,
          message: "所存金额面值必须为100",
          type: "warning",
        });
      }
    }}
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
}
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