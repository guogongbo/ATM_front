<template>
    <div class="main">
  <div class="left"></div>
  <div class="center">
    <h1>感谢您的使用,请取回您的银行卡</h1>
    <br> <br><br>
  </div>  
  <div class="right"><el-button plain @click="backtowait">回到首页</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null, // 用于存储计时器的引用
    };
  },
  methods: {
    backtowait() {
      sessionStorage.clear();
      this.$router.push("./WaitView");
    },
    startIdleTimer() {
      // 设置计时器，当用户长时间无操作时触发跳转
      this.timer = setTimeout(() => {
        this.$router.push("./WaitView");
      }, 30000); // 30秒后触发跳转，可根据需要调整超时时间
    },
    clearIdleTimer() {
      // 当组件销毁时清除计时器，避免造成内存泄漏
      clearTimeout(this.timer);
    },
  },
   mounted() {
    this.startIdleTimer();},
  beforeDestroy() {
    this.clearIdleTimer();
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