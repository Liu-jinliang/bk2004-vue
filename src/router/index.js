import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// import Films from "@/views/Films/Index";
// import NowPlaying from "@/views/Films/NowPlaying";
// import ComingSoon from "@/views/Films/ComingSoon";
// import Detail from "@/views/Films/Detail";
// import Cinemas from "@/views/Cinemas/Index";
// import Center from "@/views/Center/Index";

import filmsRouter from "./routes/films";
import cinemasRouter from "./routes/cinemas";
import centerRouter from "./routes/center";

const routes = [
  {path:"/",redirect: "/films/NowPlaying"},
  ...filmsRouter,
  cinemasRouter,
  centerRouter


//   {path:"/films",component:Films,
//     children:[
//       {path:"nowPlaying",component:NowPlaying},
//       {path:"comingSoon",component:ComingSoon}
//     ]
// },
  //电影详情
  // {path:"/film/:filmId",component:Detail},
  // 我的影院
  // {path:"/cinemas",component:Cinemas},
  // 我的中心
  // {path:"/center",component:Center},
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
