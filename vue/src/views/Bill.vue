<template>
  <div>
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
        (to.type = o.type == 0 ? "支出" : "存入"), (to.date = 123);
        var d = new Date(o.date);
        to.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        this.tableData.push(to);
      }
    },
  },
};
</script>

<style>
</style>
