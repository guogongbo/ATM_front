<template>
  <div class="main">
    <div class="left">
      <div class="buttonDistance">
        <router-link to="/BalanceInquiry">
          <el-button plain @click="getYue">余额查询</el-button>
        </router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="/OperationView">
          <el-button>返回</el-button>
        </router-link>
      </div>
    </div>
    <div class="center"><h1>请选择查询内容</h1></div>
    <div class="right">
      <div class="buttonDistance">
        <router-link to="/TransactionDetail">
          <el-button>交易明细查询</el-button>
        </router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="/TakeCard">
          <el-button>退卡</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoney } from "../../api/common";
export default {
  data() {
    return {};
  },

  methods: {
    getYue() {
      getMoney(this);
    },
  },
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