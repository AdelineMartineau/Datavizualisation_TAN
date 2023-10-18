<template>
  <div style="height:600px; width:800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.2025, -1.5474999999999999]">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker v-for="(pts, index) in points" :key="index" :lat-lng="[pts.stop_coordinates.lat,pts.stop_coordinates.lon]"></l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer,LMarker} from "@vue-leaflet/vue-leaflet";
import getArretFilter from "../services/getArretFilter"

let points = getArretFilter()



export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 20,
      points
    };
  },
};
</script>

<style></style>
