<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <div style="height:90vh;width:100%">
          <l-map ref="maps" v-model:zoom="zoom" :center="[47.216671, -1.55]">
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker v-for="(pts, index) in points" :key="index"
                      :lat-lng="[pts.stop_coordinates.lat,pts.stop_coordinates.lon]"
                      :icon="pts.isBus ? pts.isTram ? icons.twice : icons.bus : icons.tram">
              <l-tooltip>
                <h3>{{ pts.libelle }}</h3>
                <ul>
                  <li><b>Lignes :</b> <span v-for="(ln,index2) in pts.ligne" class="badge text-bg-success m-1"
                                            :key="index2">{{ ln.numLigne }}</span></li>
                  <li><b>Acces handicapé :</b>&nbsp;{{ pts.wheelchair_boarding ? "Oui" : "Non" }}</li>
                </ul>
              </l-tooltip>

            </l-marker>
            <!--      <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>-->
            <LigneTrajet></LigneTrajet>
            <!--            <l-routing-machine waypoints="waypoints"></l-routing-machine>-->
          </l-map>
        </div>
      </div>
      <div class="col-2">
        <h2>Légendes :</h2>
        <ul class="list-group">
          <li class="list-group-item row d-flex">
            <div class="col-3"><img
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                alt="Marker rouge"></div>
            <div class="col-9">Arrêt de Tram</div>
          </li>
          <li class="list-group-item row d-flex">
            <div class="col-3"><img
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
                alt="Marker bleu"></div>
            <div class="col-9">Arrêt de Bus</div>
          </li>
          <li class="list-group-item row d-flex">
            <div class="col-3"><img
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png"
                alt="Marker viollet (très belle couleur en passant)"></div>
            <div class="col-9">Arrêt de Tram et de Bus</div>
          </li>
          <li class="list-group-item row d-flex">
            <div class="col-3">
              <svg height="25">
                <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 3px; stroke-linecap: round; transform-box: fill-box; transform-origin: 50% 0%;" d="M 1.5 16.521 C 12.299 16.521 19.634 16.521 26.962 16.521" transform="matrix(1, 0, 0, 1, 0.000001, 0)"></path>
              </svg>
            </div>
            <div class="col-9">Ligne de Bus</div>
          </li>
          <li class="list-group-item row d-flex">
            <div class="col-3">
              <svg height="25">
                <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 15px; stroke-linecap: round; transform-box: fill-box; transform-origin: 50% 0%;" d="M 7.5 16.521 C 12.299 16.521 19.634 16.521 26.962 16.521" transform="matrix(1, 0, 0, 1, 0.000001, 0)"></path>
              </svg>
            </div>
            <div class="col-9">Ligne de Tram</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import {LMap, LTileLayer, LMarker, LTooltip/*,LPolyline*/} from "@vue-leaflet/vue-leaflet";
import getArretFilter from "../services/getArretFilter";
import LigneTrajet from "@/components/LigneTrajet.vue";
import formatRoute from "@/services/formatRoute";


let points = getArretFilter()
let trajet = formatRoute()

let wps = trajet[0].latlngs.map(([x, y]) => {
  return new L.latLng(x, y)
})

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LPolyline,
    LigneTrajet,
    LTooltip
    // LRoutingMachine
  },
  data() {
    return {
      zoom: 12,
      points: points,
      polyline: {
        latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color: "green"
      },
      icons: {
        tram: L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize: [12, 20],
          iconAnchor: [16, 16]
        }),
        bus: L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
          iconSize: [12, 20],
          iconAnchor: [16, 16]
        }),
        twice: L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
          iconSize: [12, 20],
          iconAnchor: [16, 16]
        }),
      }
    };
  },
};
</script>

<style>
ul li {
  text-align: left;
}
</style>
