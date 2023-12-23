<template>
    <div class="main">
  <div class="left"></div>
  <div class="center1"> <h1>是否打印凭条</h1></div>  
  <div class="right">
    <div  class="buttonDistance"><router-link to="/PrintAReceipt2"><el-button>是</el-button></router-link></div>
    <div  class="buttonDistance"><router-link to="/OperationView"><el-button>否</el-button></router-link></div>
  </div>
  </div>
</template>
<script>
    export default {
  data() {
    return {
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
.center1{
  padding-top: 100px;
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

</style>