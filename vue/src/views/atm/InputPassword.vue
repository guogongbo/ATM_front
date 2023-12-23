<template>
  <form action="">
    <div class="main">
      <div class="left"><router-link to="/TakeCard"><el-button>退卡</el-button></router-link></div>
      <div class="center"><h1>请输入您的密码：</h1>
      <br> <br><br>
        <el-input placeholder="密码" v-model="password" show-password maxlength="6"></el-input>
      </div>
      <div class="right">
       <div class="buttonDistance"> <el-button plain @click="login2">确认</el-button></div>
        <div class="buttonDistance"><el-button native-type="reset">更改</el-button></div>
      </div>
    </div>
  </form>
</template>

<script>
import { login } from "../../api/common";
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      input: "",
      password: "",
      timer: null, // 用于存储计时器的引用
      lastActivity: Date.now(), // 记录上次活动时间
    };
  },
  
  methods: {
      resetIdleTimer() {
      // 检测到用户操作时重置计时器
      const now = Date.now();
      if (now - this.lastActivity > 30000) { // 如果超过30秒无操作
        this.startIdleTimer(); // 重新开始计时器
      } else {
        clearTimeout(this.timer); // 清除当前计时器，避免重复触发跳转
        this.timer = setTimeout(() => {
         this.$router.push("./ReturnCard");
        }, 30000); // 重新设置计时器，30秒后触发跳转
      }
      this.lastActivity = now; // 更新上次活动时间
    },
    startIdleTimer() {
      // 设置计时器，当用户长时间无操作时触发跳转
      this.timer = setTimeout(() => {
        this.$router.push("./ReturnCard");
      }, 30000); // 30秒后触发跳转，可根据需要调整超时时间
    },
    clearIdleTimer() {
      // 当组件销毁时清除计时器，避免造成内存泄漏
      clearTimeout(this.timer);
    },
    login2() {
      jsCookie.set('password',this.password)
      this.username = jsCookie.get("cardnumber");
      this.password = this.password.trim();
      if (this.username == "" || this.password == "") {
        this.$message({
          showClose: true,
          message: "密码不能为空",
          type: "error",
        });
      } else {
        login(this, this.username, this.password);
      }
    },
  },
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
  beforeCreate() {
    if (sessionStorage.getItem("user") != null) {
      this.$router.push("./WaitView1"); //重定向到bill
    }
  },
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