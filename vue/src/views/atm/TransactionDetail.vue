<template>
  <div class="main">
    <div class="left">
      
    </div>
    <div class="center">
      <div><h1>交易明细查询</h1></div>
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
  <div>  
    <p>{{ currentPage }} / {{ totalPages }}</p>  
    <button @click="prevPage">上一页</button>  
    <button @click="nextPage">下一页</button>  
  </div>  
   <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
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
         currentPage: 1, // 当前页数，初始为1  
      totalPages: Math.ceil(this.tableData.length / this.pageSize), // 总页数  
      pageSize: 10, // 每页显示的数据条数  
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
     prevPage() {  
    if (this.currentPage > 1) {  
      this.currentPage--;  
    }  
  },  
  nextPage() {  
    if (this.currentPage < this.totalPages) {  
      this.currentPage++;  
    }  
  },  
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
        this.tableData.sort((a, b) => b.record_id - a.record_id);
     // 分页处理  
    const pageSize = 10; // 每页显示的数据条数  
    const totalPages = Math.ceil(this.tableData.length / pageSize); // 计算总页数  
    const currentPage = 1; // 当前页数，可以根据需要动态设置  
  
    // 获取当前页的数据  
    const currentPageData = this.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);  
  
    // 将分页后的数据存入this.tableData中  
    this.tableData = currentPageData;   
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