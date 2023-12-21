<template>
  <l-polyline v-for="(route, index) in routes" :key="index" :color="route.color" :lat-lngs="route.latlngs" :weight="route.ligne.length === 1 ? 10:3"></l-polyline>
<!--  <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>-->
</template>

<script>
import getLignesTraces from "@/services/getLignesTraces";
import {LPolyline} from "@vue-leaflet/vue-leaflet"
//import "leaflet-routing-machine"
import formatRoute from "@/services/formatRoute";



let routes = formatRoute()

console.log(routes)

export default{
  components:{
    LPolyline
  },
  data(){
    return {
      routes: routes,
    }
  },
}
</script>

<style scoped>

</style>
