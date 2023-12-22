<template>
  <form>
    <div class="main">
      <div class="left">
        <span>
        
            <el-button @click="cardsubmit">确认</el-button>

        </span>
      </div>
      <div class="center">
        <div><h1>欢迎您使用ATM机，请输入银行卡号</h1></div>
        <br> <br><br>
        <div>
          <el-input placeholder="请输入银行卡号" v-model="input" ></el-input>
        </div>
      </div>
      <div class="right">
        <span><el-button native-type="reset">更改</el-button></span>
      </div>
    </div>
  </form>
</template>

<script>
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    cardsubmit() {
      jsCookie.set("cardnumber", this.input);
      if (this.input == "") {
        this.$message({
          showClose: true,
          message: "银行卡号不能为空",
          type: "error",
        });
      } else {
        this.$getBankcardinfo.getBankBin(this.input, (err, data) => {
          console.log(this.input);
          console.log(err);
          if (!err) {
            console.log(data);
            
              jsCookie.set("bankName", data.bankName);
              jsCookie.set("cardTypeName", data.cardTypeName);
              console.log("///////",data.bankName)
              this.$message({
                showClose: true,
                message:"开户行:"+data.bankName+" \n银行卡类型:"+data.cardTypeName,
              });
              this.$router.push({ path: "../WaitView1" });
            

          }
          else if (err){
            this.$message({
              showClose: true,
              message: "银行卡不正确",
              type: "error",
            });

          }
        })

      }
    },

  },
/*   mounted() {
    this.cardsubmit();
  }, */
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