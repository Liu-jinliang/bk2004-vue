<template>
    <div class="herder">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的 铁子!!!"
            @load="onLoad"
        >
            <!-- <div class="Loading" v-show="isLoading">
                <van-loading type="spinner" size="24px">加载中...</van-loading>
            </div> -->
        <van-card v-for="item in list " :key="item.filmsId">
            <!-- 电影名称 -->
                <template #title>
                    <div class="name">{{item.name}}
                        <span class="item">{{item.filmType.name}}</span>
                    </div>
                </template>
            <!-- 图片 -->
                <template #thumb><img :src="item.poster" width="66px" height="90px"></template>
                <template #desc class="line-height">
                    <div>主演: {{item.actors | sub}}</div>
                    <div>{{item.nation}} | {{ item.runtime}}</div>
                    <div>上映日期: {{item.premiereAt | timeStamp}}</div>
                    <div class="nowPlayingFilm-buy">预约</div>

                </template>
                <template ></template>
        </van-card>
        </van-list>
    </div>
</template>
<script>
import Vue from 'vue';
import { Loading , Card, Tag , Button , PullRefresh, List  } from 'vant';
import uri from "@/config/uri";
import moment from "moment";
Vue.use(Loading);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Button);
Vue.use(List);
export default {
    
    data () {
        return {
            loading:false,
            list:[],
            finished: false,
            pageNum:1,
        }
    },
    methods:{
        getdata(){
                this.$http.get(uri.getComingSoon + "?pageNum=" + this.pageNum).then(ret => {
                    if(ret.status == 0){
                        if(this.pageNum <= Math.ceil(ret.data.total/10)){
                            this.list = [...this.list ,...ret.data.films ]
                            this.pageNum++
                        }else{
                            this.finished = true
                        }
                    }else{
                        return "网络出错"
                    }
                    this.loading = false
              })
        },
        onLoad(){
            this.getdata()
        }
    },
    filters:{
        sub(actors){
            if(actors){
                var str = ""
                actors.forEach(el=>{
                    str += el.name + " "
                })
                return str.substr(0,15) + "..."
            }else{
                return "暂无主演"
            }
        },
        timeStamp(timeStamp){
            const arr = ["周日","周一","周二","周三","周四","周五","周六"]
            const week = arr[moment(timeStamp * 1000).format("d")]//周
            const day = moment(timeStamp * 1000).format("D")//天
            const month = moment(timeStamp * 1000).format("M")//月
            return `${week} ${month} 月 ${day} 日 `
        }
    }
}
</script>
<style lang="scss" scoped>
    .Loading{
        text-align: center;
    }
    .item{
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
    }
    .name{
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
    img{
        border-radius: 0;
    }
    .nowPlayingFilm-buy{
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        float: right;
        border: 1px solid  #ff5f16;
        margin-top:-40px ;
        
    }
    .herder{
        // padding-top: 44px;
        margin-bottom: 50px;
    }
   
</style>