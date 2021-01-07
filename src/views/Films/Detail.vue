<template>
  <div>
    <div><img :src="film.poster" width="100%" /></div>
    <div>
      <h3>{{ film.name }}</h3>
    </div>
    <div>
      {{ film.category }}
    </div>
    {{ film.premiereAt | timestamp }}上映
    <div>{{ film.nation }} | {{ film.runtime }}分钟</div>
    <div>{{ film.synopsis }}</div>

    <div><h4>演职人员</h4></div>
    <yanyuan :key="film.actors.length">
      <div
        class="swiper-slide"
        v-for="(item, index) in film.actors"
        :key="index"
      >
        <img :src="item.avatarAddress" width="85px" />
      </div>
    </yanyuan>
  </div>
</template>
<script>
import Vue from "vue";
import uri from "@/config/uri";
import { Toast } from "vant";
import moment from "moment";
import Vuelazyload from "vue-lazyload";
import yanyuan from "./yanyuan";
Vue.use(Toast);
Vue.use(Vuelazyload, {
  loading:
    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2962937242,1933230585&fm=26&gp=0.jpg",
});
export default {
  data() {
    return {
      film: { actors: [] },
    };
  },
  created() {
    this.$http
      .get(uri.getDetail + "?filmId=" + this.$route.params.filmId)
      .then((ret) => {
        console.log(ret);
        if (ret.status == 0) {
          this.film = ret.data.film;
        } else {
          Toast.fail("抱歉 刚才溜号了!!!");
        }
      });
  },
  filters: {
    timestamp(timestamp) {
      const time = moment(timestamp * 1000).format("YYYY-MM-DD");
      return time;
    },
  },
  components: {
    yanyuan,
  },
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  width: 100px;
  margin-bottom: 50px;
}
</style>
