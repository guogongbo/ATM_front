<template>
  <div class="main">
    <div class="left">
      <div class="buttonDistance">
        <router-link to="/WithdrawView">
          <el-button plain @click="getYue">取款</el-button>
        </router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="DepositView1">
          <el-button>存款</el-button>
        </router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="/SearchView"><el-button>查询</el-button></router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="/TransferAccounts1">
          <el-button plain @click="getYue">转账</el-button>
        </router-link>
      </div>
    </div>
    <div class="center"><h1>请选择服务项目</h1></div>
    <div class="right">
      <el-row class="buttonDistance">
        <router-link to="/ChangePassword">
          <el-button>修改密码</el-button>
          </router-link>
      </el-row>
      <el-row class="buttonDistance">
        <router-link to="/TakeCard">
          <el-button>退卡</el-button>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMoney } from "../../api/common";
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    getYue() {
      getMoney(this);
    },
  },
};
</script>
<style >
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