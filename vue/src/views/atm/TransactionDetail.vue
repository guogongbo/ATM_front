<template>
  <div class="main">
    <div class="left">
      
    </div>
    <div class="center">
      <div><h1>交易明细查询</h1></div>
      <br> <br><br>
      <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="record_id"
        label="编号"
        width="130"
      ></el-table-column>
      <el-table-column prop="cardno" label="卡号" width="230"></el-table-column>
      <el-table-column prop="amount" label="交易金额" width="180">
      </el-table-column>
      <el-table-column prop="type" label="交易类型" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="230"> </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <div class="buttonDistance">
        <router-link to="/SearchView"><el-button> 返回</el-button></router-link>
      </div>
      <div class="buttonDistance">
        <router-link to="/TakeCard"><el-button> 退卡</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    var id = JSON.parse(sessionStorage.getItem("user")).id;
    var params = {
      id: id,
    };
    var data = qs.stringify(params);
    this.$axios
      .post("http://127.0.0.1:8080/BankTransfer/getRecords", data)
      .then((res) => {
        this.dealResponse(res.data);
      });
  },
  methods: {
    dealResponse(arr) {
      for (let o of arr) {
        let to = {};
        to.record_id = o.id;
        to.cardno = o.card.cardno;
        to.amount = o.amount;
        to.type = o.type;
        if(o.type == 0){
          to.type = "转账支出";
        }
        else if(o.type == 1){
          to.type = "存入"
        }
        else{
          to.type = "取款支出"
        }
        (to.date = 123);
        var d = new Date(o.date);
        to.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        this.tableData.push(to);
      }
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