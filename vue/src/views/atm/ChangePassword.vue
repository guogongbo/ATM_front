<template>
  <form action="">
    <div class="main">
      <div class="left"></div>
      <div class="center">
        <div><h1>请输入您新的密码：</h1></div>
        <el-input v-model="newpassword1" show-password maxlength="6"></el-input>
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
      jsCookie.set("newpassword1", this.newpassword1);
       if (this.newpassword1 == "") {
        this.$message({
          showClose: true,
          message: "新密码不能为空",
          type: "error",
        });
      } else {
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
</style>