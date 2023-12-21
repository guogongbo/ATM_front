<template>
  <div class="main">
    <div class="left"></div>
    <div class="center1">
      <h1>请将要存的现金放入存款槽</h1>
      <el-input v-model="money" placeholder="存款金额"></el-input>
    </div>
    <div class="right">
      <div class="buttonDistance">
        <router-link to="/DepositView2">
          <el-button @click="cashsubmit">存放完成，点钞</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
  data() {    
    return {
      money: "",
    }    
  },
  methods: {
    cashsubmit(){
      jsCookie.set('cash',this.money);
      console.log(jsCookie.get('cash'));
    }
  },
  mounted() {
    this.cashsubmit();
  }
}
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
.center1 {
  padding-top: 100px;
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