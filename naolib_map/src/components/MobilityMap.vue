<template>
  <div style="height:1200px; width:1800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.216671, -1.55]">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
            <l-marker v-for="(pts, index) in points" :key="index" :lat-lng="[pts.stop_coordinates.lat,pts.stop_coordinates.lon]"></l-marker>
<!--      <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>-->
            <LigneTrajet></LigneTrajet>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer,LMarker/*,LPolyline*/} from "@vue-leaflet/vue-leaflet";
import getArretFilter from "../services/getArretFilter";
import LigneTrajet from "@/components/LigneTrajet.vue";

let points = getArretFilter()

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LPolyline,
    LigneTrajet
  },
  data() {
    return {
      zoom: 12,
      points,
      polyline:{
        latlngs:[[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color:"green"
      }
    };
  },
};
</script>

<style></style>
