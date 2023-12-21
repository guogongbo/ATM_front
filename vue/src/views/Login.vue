<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="账户" v-model="username" clearable></el-input>
        <el-input
          placeholder="密码"
          v-model="password"
          show-password
        ></el-input>
        <el-button type="primary" plain @click="login2">login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "../api/common";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login2() {
      this.username = this.username.trim();
      this.password = this.password.trim();
      if (this.username == "" || this.password == "") {
        this.$message({
          showClose: true,
          message: "请重试",
          type: "error",
        });
      } else {
        login(this, this.username, this.password);
      }
    },
  },
  beforeCreate() {
    if (sessionStorage.getItem("user") != null) {
      this.$router.push("/bill"); //重定向到bill
    }
  },
};
</script>

<style></style>
