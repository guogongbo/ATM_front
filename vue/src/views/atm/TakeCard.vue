<template>
    <div class="main">
  <div class="left"></div>
  <div class="center">
    <h1>感谢您的使用,请取回您的银行卡</h1>
    <br> <br><br>
    <el-button plain @click="backtowait">回到首页</el-button>
  </div>  
  <div class="right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    backtowait() {
      sessionStorage.clear();
      this.$router.push("./WaitView");
    },
  },
};
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

</style>