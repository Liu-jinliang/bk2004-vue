<template>
  <div :class="{ header: is_show }">
    <van-tabs @change="onClick" v-model="active" line-width="60px">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);

export default {
  data() {
    return {
      active: 0,
      urls: ["/films/nowPlaying", "/films/comingSoon"],
      is_show: false,
    };
  },
  methods: {
    onClick(index) {
      this.$router.push(this.urls[index]);
    },
  },
  created() {
    this.active = this.urls.indexOf(this.$route.path);
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= 200) {
        this.is_show = true;
      } else {
        this.is_show = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
}
</style>
