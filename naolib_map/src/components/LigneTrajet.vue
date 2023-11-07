<template>
  <l-polyline v-for="(route, index) in routes" :key="index" :color="route.color" :lat-lngs="route.latlngs"></l-polyline>
<!--  <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>-->
</template>

<script>
import getLignesTraces from "@/services/getLignesTraces";
import {LPolyline} from "@vue-leaflet/vue-leaflet"

let routes = []

let lignes = getLignesTraces()
let latlngs = [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]];


for (const ligne of lignes) {
  for (const route of ligne.routes) {
    routes.push({
      latlngs: route.shape.map(x=>[x[1],x[0]]),
      color: "#"+ligne.color.toLowerCase()
    })
  }
}

console.log(routes)

export default{
  components:{
    LPolyline
  },
  data(){
    return {
      routes: routes,
    }
  }
}
</script>

<style scoped>

</style>
