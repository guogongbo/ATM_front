<template>
  <el-row id="top-nav">
    <el-col :span="22">
      <el-menu class="" mode="horizontal">
        <el-menu-item><router-link to="/bill">账单 </router-link></el-menu-item>
        <el-menu-item
          ><router-link to="/transfer">转账1 </router-link></el-menu-item
        >
        <el-menu-item
          ><router-link to="/deposit">存款 </router-link></el-menu-item
        >
        <el-menu-item @click="setLoginState">
          {{ $store.state.islogin }}</el-menu-item
        >
      </el-menu>
    </el-col>
    <el-col :span="2" class="user-info">
      <el-avatar> {{ $store.state.userName }} </el-avatar>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    setLoginState() {
      var msg = this.$store.state.islogin;
      if (msg == "退出") {
        sessionStorage.removeItem("user");
        this.$store.commit("delChooseModuleAll", []); //清空state
        sessionStorage.removeItem("store");
        this.$router.push("/login");
      } else {
        this.$store.commit;
      }
    },
  },
  watch: {
    name(val) {
      this.setName();
    },
  },
};
</script>
