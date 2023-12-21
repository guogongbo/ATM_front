<template>
  <div class="main">
  <div class="left"></div>
  <div class="center"><h1 class="hh1">已吞卡</h1>
    <div class="c1">请持身份证和吞卡凭条到前台取卡</div>  
  </div>
  <div class="right"></div>
  </div>
</template>
<script>
    export default {
  data() {
    return {
      input: ''
    }
  }
}
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
  padding-top: 600px;
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
  padding-top: 600px;
  box-sizing: border-box;
  text-align: right;
  width:300px;
  height:750px;
}
.hh1{
  color:red;
}
.c1{
  font-size: 50px;
}
</style>