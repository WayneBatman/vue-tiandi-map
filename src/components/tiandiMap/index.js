import TiandiMap from './map/Map.vue'
import TmView from './map/MapView.vue'
/*import TmControl from './controls/Control.vue'
import LocalSearch from './search/LocalSearch.vue'*/

export default {
    install (Vue, options) {
        Vue.component('tiandi-map', TiandiMap);
        Vue.component('tm-view', TmView);
        /*        Vue.component('tm-control', TmControl);
                Vue.component('tm-local-search',LocalSearch);*/
    }
}

export {
    TiandiMap,TmView,
}

