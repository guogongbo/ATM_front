<template>
  <div class="main">
    <div class="left">
      <router-link to="/InputPassword">
        <el-button>确认</el-button>
      </router-link>
    </div>
    <div class="center">
      <div><h1>请确认卡号是否正确</h1></div>
      <br> <br><br>
      <el-input placeholder="" v-model="input" :disabled="true"></el-input>
    </div>
    <div class="right">
      <router-link to="/WaitView"><el-button>更改</el-button></router-link>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
  data() {
    return {
      input: jsCookie.get('cardnumber'),
      timer: null, // 用于存储计时器的引用
      lastActivity: Date.now(), // 记录上次活动时间
    };
  },
  methods: {
      resetIdleTimer() {
      // 检测到用户操作时重置计时器
      const now = Date.now();
      if (now - this.lastActivity > 5000) { // 如果超过30秒无操作
        this.startIdleTimer(); // 重新开始计时器
      } else {
        clearTimeout(this.timer); // 清除当前计时器，避免重复触发跳转
        this.timer = setTimeout(() => {
         this.$router.push("./ReturnCard");
        }, 5000); // 重新设置计时器，30秒后触发跳转
      }
      this.lastActivity = now; // 更新上次活动时间
    },
    startIdleTimer() {
      // 设置计时器，当用户长时间无操作时触发跳转
      this.timer = setTimeout(() => {
        this.$router.push("./ReturnCard");
      }, 5000); // 30秒后触发跳转，可根据需要调整超时时间
    },
    clearIdleTimer() {
      // 当组件销毁时清除计时器，避免造成内存泄漏
      clearTimeout(this.timer);
    },},
    mounted() {
    this.startIdleTimer();
    document.addEventListener('keydown', this.resetIdleTimer);
    document.addEventListener('mousemove', this.resetIdleTimer);
    },
  beforeDestroy() {
    this.clearIdleTimer();
    document.removeEventListener('keydown', this.resetIdleTimer); 
     document.removeEventListener('mousemove', this.resetIdleTimer);// 在组件销毁前移除事件监听器，避免内存泄漏
  },
  computed:{
    showcardnumber(){
      return jsCookie.get('cardnumber')
    }
  }
};
</script>

<style >
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
.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}

</style>