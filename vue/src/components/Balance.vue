<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="always"> 账户余额：{{ $store.state.money }} 元</el-card>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
