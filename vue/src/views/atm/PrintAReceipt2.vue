<template>
    <div class="main">
  <div class="left"></div>
  <div class="center"> <h1>打印成功，请在凭条打印机处领取凭条</h1>
            <br><br><br>
    <div>
      <table class="table1" border="1" cellspacing="0">
          <tr><td>卡号</td><td>{{ $store.state.curuser.username }}</td></tr>
          <tr> <td>交易类型</td><td>{{type}}</td></tr>
          <tr> <td>金额</td><td>{{ transactionDetail }}元</td></tr>
          <tr> <td>日期</td><td>{{ currentTime }}</td></tr>
        </table>
    </div>
      </div>  
  <div class="right"><div class="buttonDistance"><router-link to="/OperationView"><el-button>确认</el-button></router-link></div></div>
  </div>
</template>
<script>
import jsCookie from "js-cookie";
    export default {
  data() {
    return {
      type: jsCookie.get('type'),
      transactionDetail:jsCookie.get('transactionDetail'),
      currentTime: new Date().toLocaleString()
    }
  },
  computed:{
    showTransactionDetail(){
      return jsCookie.get('transactionDetail')
    },
    showTransactionType(){
      return jsCookie.get('type')
    }
  }
    }
</script>
<style>
.main{
  display:flex;
  justify-content: space-between;
  width: 100%;
  height: 780px;
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
.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}
.table1{
  text-align: center;
  width:100%;
  background-color:white;
  font-size: 40px;
}

</style>