<template>
    <div>
        <van-tabbar  @change="changeItem" v-model="active" >

            
        <van-tabbar-item >
            <van-icon class-prefix="iconfont icon-dianying" slot="icon" size="1.2rem"/>
                <span>电影</span>
        </van-tabbar-item><van-tabbar-item>
            <van-icon class-prefix="iconfont icon-yingyuan" slot="icon" size="1.2rem"/>
                <span>影院</span>
        </van-tabbar-item><van-tabbar-item>
            <van-icon class-prefix="iconfont icon-ziyuan" slot="icon" size="1.2rem"/>
                <span>我的</span>
        </van-tabbar-item>



        <!-- <van-tabbar-item icon="search">电影</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item> -->
        </van-tabbar>

    </div>
</template>


<script>
import "@/assets/font/iconfont.css";
import Vue from 'vue';
import { Tabbar, TabbarItem , Icon} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
       
    data(){
        return{
            active:0,
            urls:["/films/nowPlaying","/cinemas","/center"]
        }
    },
    methods:{
        changeItem(index){
              this.$router.push(this.urls[index])
        },
    }, 
    created(){
         this.active = this.urls.indexOf(this.$route.path)
    },

  
}
</script>