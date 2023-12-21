<template>
    <div class="main">
  <div class="left"></div>
  <div class="center2">
        <div class="title"><strong>欢迎您使用中国银行自动柜员机</strong></div>
        <div class="content">抵制银行卡网上非法买卖，保障银行卡规范使用</div>
        <div class="content">谨防电信诈骗，请不要将资金转入陌生人账户</div>
        </div>
  <div class="right"> <div><router-link to="/WaitView"><el-button>继续</el-button></router-link></div></div>
  </div>
</template>
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
.center2 {
  padding-top: 250px;
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
.title{
  font-size: 40px;
   background-color: white;
}
.content{
  font-size: 30px;
  background-color: white;
}.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}
</style>