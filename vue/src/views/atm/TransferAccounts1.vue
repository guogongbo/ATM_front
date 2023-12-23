<template>
  <form>
    <div class="main">
      <div class="left">
        <div class="buttonDistance">
          <router-link to="/OperationView"><el-button>返回</el-button></router-link>
        </div>
      </div>
      <div class="center">
        <div><h1>请输入转账账号：</h1></div>
        <br> <br><br>
        <el-input placeholder="请输入转出账户银行卡号" v-model="toAccount"></el-input>
      </div>
      <div class="right">
        <div class="buttonDistance">
          <el-button @click="TransferToAccount">确认</el-button>
        </div>
        <div class="buttonDistance">
          <el-button native-type="reset">更改</el-button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import qs from "qs";
import jsCookie from 'js-cookie';
export default {
  data() {    
    return {
      toAccount: this.toAccount,
    }    
  },
  
  methods: {
    transfercardsubmit(){
      jsCookie.set('transfercard',this.toAccount);
      console.log(jsCookie.get('transfercard'));
    },

    TransferToAccount() {
      jsCookie.set('transfercard',this.toAccount);
      console.log(jsCookie.get('transfercard'));
      var params = {
        toAccount: this.toAccount,
      };
      var data = qs.stringify(params);
      this.$axios
        .post("http://8.139.5.168:8080/BankTransfer/getToAccount", data)
        .then((res) => {
          var len = res.data.length;
          if (len > 0) {
            if (
              res.data == JSON.parse(sessionStorage.getItem("user")).realname
            ) {
              this.$message.error(`不可以给自己转账哦`);
              this.cansubmit = false;
            } else {
              this.$message(
                `转入账户真实名字：${"*".repeat(len - 2)}${res.data.substr(
                  len - 2,
                  2
                )}`
              );
              this.cansubmit = true;
              this.$router.push("/TransferAccounts3");
            }
          } else {
            this.$message.error(`转出账户不存在`);
            this.cansubmit = false;
          }
        });
    },
  },
  mounted() {
    this.transfercardsubmit();
  }
}
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