<template>
  <div class="herder">
    <van-pull-refresh
      v-model="isLoading2"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="Loading" v-show="isLoading">
        <van-loading type="spinner" size="24px">加载中...</van-loading>
      </div>
      <van-card
        v-for="item in list"
        :key="item.filmsId"
        @click="goDetail(item.filmId)"
      >
        <!-- 电影名称 -->
        <template #title>
          <div class="name">
            {{ item.name }}
            <span class="item">{{ item.filmType.name }}</span>
          </div>
        </template>
        <!-- 图片 -->

        <template #thumb
          ><img :src="item.poster" width="66px" height="90px"
        /></template>
        <template #desc class="line-height">
          <div>
            观众评分 <span class="grade">{{ item.grade }}</span>
          </div>
          <div>主演: {{ item.actors | sub }}</div>
          <div>{{ item.nation }} | {{ item.runtime }}</div>
          <div class="nowPlayingFilm-buy">购票</div>
        </template>
        <template></template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from "vue";
import { Loading, Card, Tag, Button, PullRefresh } from "vant";
import uri from "@/config/uri";
Vue.use(Loading);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Button);
Vue.use(PullRefresh);

export default {
  created() {
    this.getdata();
  },
  data() {
    return {
      isLoading: true,
      isLoading2: false,
      list: [],
      pageNum: 1,
    };
  },
  methods: {
    onRefresh() {
      this.getdata();
    },
    getdata() {
      this.$http
        .get(uri.getNowPlaying + "?pageNum=" + this.pageNum)
        .then((ret) => {
          if (ret.status == 0) {
            if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
              this.list = [...ret.data.films, ...this.list];
              this.pageNum++;
            }
          } else {
            return "网络出错";
          }
          this.isLoading = false;
          this.isLoading2 = false;
        });
    },
    goDetail(filmId) {
      this.$router.push("/film/" + filmId);
    },
  },

  filters: {
    sub(actors) {
      if (actors) {
        var str = "";
        actors.forEach((el) => {
          str += el.name + " ";
        });
        return str.substr(0, 15) + "...";
      } else {
        return "暂无主演";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Loading {
  text-align: center;
}
.item {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}
.grade {
  color: #ffb232;
  font-size: 14px;
}
.name {
  max-width: calc(100% - 25px);
  color: #191a1b;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
img {
  border-radius: 0;
}
.nowPlayingFilm-buy {
  line-height: 25px;
  height: 25px;
  width: 50px;
  color: #ff5f16;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  float: right;
  border: 1px solid #ff5f16;
  margin-top: -40px;
}
.herder {
  // padding-top: 44px;
  margin-bottom: 50px;
}
</style>
