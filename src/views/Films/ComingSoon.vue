<template>
    <div>
        <div class="Loading" v-show="isLoading">
            <van-loading type="spinner" size="24px">加载中...</van-loading>
        </div>
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
                <div>类型:{{item.category}}</div>
                <div>{{item.nation}} | {{ item.runtime}}</div>
                <div class="nowPlayingFilm-buy">购票</div>
            </template>
        </van-card>

    </div>
</template>
<script>
import Vue from 'vue';
import { Loading , Card, Tag , Button} from 'vant';
import uri from "@/config/uri";
Vue.use(Loading);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Button);

export default {
    created () {
        this.$http.get(uri.getComingSoon).then(ret => {
            console.log(ret)
            if(ret.status == 0){
                this.list = ret.data.films
            }else{
                return "网络出错"
            }
            this.isLoading = false
        })
    },
    data () {
        return {
            isLoading:true,
            list:[]
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
    .grade{
        color: #ffb232;
        font-size: 14px;
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
        font-size: 12px;
        text-align: center;
        position: relative;
        left:235px;
        top:-30px;
        border: 1px solid #ff5f16;
        border-radius: 4px;
    }
    .line-height{
        padding-top: 50px;
        
    }

</style>