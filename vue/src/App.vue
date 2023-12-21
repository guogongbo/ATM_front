<template>
  <!-- <div id="app">
    <Home />
  </div> -->
  <div>
    <router-view></router-view>
  </div>

</template>

<script>
//import Home from "@/views/Home";
export default {
  // components: {
  //   Home,
  // },
  created() {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style>
.el-button{
  font-size: 30px;
  color:black;
  background-color: white;
}

</style>
