<template>
  <el-container>
    <el-header>
      <TopNav />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <Balance />
  </el-container>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import Balance from "@/components/Balance.vue";
export default {
  components: {
    TopNav,
    Balance,
  },
};
</script>

<style></style>
