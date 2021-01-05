<template>
  <div id="app">
    <router-view/>
      <Footer />
  </div>
</template>
<script>
// import uri from "@/config/uri";
import Footer from "@/components/Navigation/Footer";

export default {
  components:{
    Footer,
  },
    
    
    created(){
        // this.$http.get(uri.getcity).then(ret=>{console.log(ret);})
    }
}
</script>