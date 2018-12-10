import TiandiMap from './map/Map.vue'
import TmView from './map/MapView.vue'
import TmControl from './controls/Control'
import TmZoom from './controls/Zoom'
import TmLocalSearch from './search/LocalSearch'
import TmPolygon from './overlays/Polygon'
import TmMarker from './overlays/Marker'

export default {
    install (Vue, options) {
        Vue.component('tiandi-map', TiandiMap);
        Vue.component('tm-view', TmView);

        Vue.component('tm-control', TmControl);
        Vue.component('tm-zoom',TmZoom);

        Vue.component('tm-local-search',TmLocalSearch);

        Vue.component('tm-marker',TmMarker);
        Vue.component('tm-polygon',TmPolygon);
    }
}

export {
    TiandiMap,TmView,
    TmZoom,TmControl,
    TmMarker,TmPolygon,
    TmLocalSearch,
}

