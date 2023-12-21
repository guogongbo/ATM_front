<template>
  <form action="">
    <div class="main">
      <div class="left"><router-link to="/TakeCard"><el-button>退卡</el-button></router-link></div>
      <div class="center"><h1>请输入您的密码：</h1>
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
    };
  },
  
  methods: {
    
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
  height: 750px;
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
</style>