<template>
    <el-container style="height: 750px; border: 1px solid #eee">
     <el-header><h1>密码输入错误，请重新输入</h1> <h2>密码输错三次后吞卡</h2>
      </el-header>
    <el-main>
        <el-input
  placeholder=""
  v-model="input">
</el-input>
    </el-main>
    <el-row>
  <el-button>确认</el-button> <el-button>更改</el-button><el-button>退卡</el-button>
    </el-row>
    </el-container> 
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
.el-container{
        background: url("../../assets/中国银行图片.png")  no-repeat center fixed;
          background-size: cover;
    } 
    .el-button{
        text-align: right;
    } 
    .el-header {
    text-align: center;
    line-height:300px;
  }
    .el-main {
    text-align: center;
    line-height:300px;
  }
  h2{
    color:red;
  }
</style>