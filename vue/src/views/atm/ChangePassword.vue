<template>
  <form action="">
    <div class="main">
      <div class="left"><div class="buttonDistance"><router-link to="/OperationView"><el-button> 返回</el-button></router-link></div></div>
      <div class="center">
        <div><h1>请输入您新的密码：</h1></div>
        <br> <br><br>
        <el-input  v-model="newpassword1"  show-password  maxlength="6"></el-input>
      </div>
      <div class="right">
        <div class="buttonDistance">
          
          <el-button plain @click="submit">确认</el-button>
        </div>
        <div class="buttonDistance">
          <el-button native-type="reset">更改</el-button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      newpassword1: "",
    };
  },
  methods:{
   submit() {
      var a=parseInt(this.newpassword1)
      var length=this.newpassword1.length;
      jsCookie.set("newpassword1", this.newpassword1);
       if (this.newpassword1 == "") {
        this.$message({
          showClose: true,
          message: "新密码不能为空",
          type: "error",
        });
      }
      else if(length<6){
          this.$message({
          showClose: true,
          message: "新密码长度必须为6位",
          type: "error",
      })}
      else if(isNaN(a)||isNaN(Number(this.newpassword1))){
         this.$message({
          showClose: true,
          message: "新密码必须为数字密码",
          type: "error",})
      }
      else {
        this.$router.push({ path: "../ChangePassword1" });
      }
    },}
};
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