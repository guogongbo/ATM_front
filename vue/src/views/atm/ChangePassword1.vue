<template>
  <form action="">
    <div class="main">
      <div class="left"><div class="buttonDistance"><router-link to="/OperationView"><el-button> 返回</el-button></router-link></div></div>
      <div class="center">
        <div><h1>请再一次输入您新的密码：</h1></div>
        <br> <br><br>
        <el-input v-model="newpassword2" show-password maxlength="6"></el-input>
      </div>
      <div class="right">
        <div class="buttonDistance">
            <el-button  plain @click="change">确认</el-button>
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
let qs = require('qs');
let axios = require('axios');
export default {
  data() {
    return {
      newpassword2:'',
      username: jsCookie.get("cardnumber"),
    };
  },

  methods: {
    
    
    change() {
        if (this.newpassword2 == "") {
        this.$message({
          showClose: true,
          message: "新密码不能为空",
          type: "error",
        });
      }
      else if(jsCookie.get("newpassword1")!=this.newpassword2){
        this.$router.push({ path: "../ChangePassword2" });
      }else{
      var params = {
        username: this.username,
        newpassword: this.newpassword2,
    };
    var data = qs.stringify(params);

    axios
        .get("http://localhost:8080/BankTransfer/changePassword?" + data)
        .then(
            function (res) {
                console.log(res.data);
                this.$store.commit("addUser", res.data); // 登录的用户信息放到 $store.state 状态里面
                sessionStorage.setItem("user", JSON.stringify(res.data)); // sessionStorage 记录登录信息，一旦关闭浏览器销毁
                this.$router.push({ path: "../ChangePassword3" }); //重定向到bill
                // _this.$store.commit("setLogin", "退出");
                // getMoney(this);
                // if (sessionStorage.getItem("user") != null) {
                //     var realname = JSON.parse(sessionStorage.getItem("user")).realname;
                //     this.$store.commit(
                //         "setUserName",
                //         realname.substr(realname.length - 2, 2)
                //     );
                // }
            }.bind(this)
        )
        .catch(function (error) {
            console.log(error);
            this.$message({
                showClose: true,
                message: "请重试",
                type: "error",
            });
        });}
    },
  },
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