<template>
  <div>
    <!-- <h1>电影首页</h1> -->
    <Header />
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "@/components/Navigation/FilmHeader";
export default {
  components: {
    Header,
  },
};
</script>
