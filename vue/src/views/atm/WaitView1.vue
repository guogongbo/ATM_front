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
    };
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