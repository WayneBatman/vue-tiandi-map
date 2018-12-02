<template>
  <div>
    <div v-if="!hasTmView" ref="view" style="width: 100%; height: 100%">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import bindEvents from '../base/bindEvent.js'
import {checkType} from '../base/util.js'

export default {
    name: 'tiandi-map',
    props: {
        center: {
            type: [Object, String]
        },
        zoom: {
            type: Number
        },
        minZoom: {
            type: Number
        },
        maxZoom: {
            type: Number
        },
        mapType: {//TMAP_NORMAL_MAP--此地图类型展示普通街道视图。|TMAP_SATELLITE_MAP--此地图类型展示卫星视图。|TMAP_HYBRID_MAP--此地图类型展示卫星和路网的混合视图。|TMAP_TERRAIN_MAP--此地图类型展示地形视图。|TMAP_TERRAIN_HYBRID_MAP--此地图类型展示地形和路网的混合视图。
            type: String
        },
        dragging: {
            type: Boolean,
            default: true
        },
        scrollWheelZoom: {
            type: Boolean,
            default: false
        },
        doubleClickZoom: {
            type: Boolean,
            default: true
        },
        keyboard: {
            type: Boolean,
            default: true
        },
        inertialDragging: {//惯性拖动
            type: Boolean,
            default: true
        },
        continuousZoom: { //连续缩放
            type: Boolean,
            default: true
        },
        pinchToZoom: { //双指缩放
            type: Boolean,
            default: true
        },
        autoResize: { //自适应容器尺寸
            type: Boolean,
            default: true
        },
        theme: {
            type: String
        }
    },
    watch: {
        center (val, oldVal) {
            const {map, zoom} = this;
            if (checkType(val) === 'String' && val !== oldVal) {
                map.centerAndZoom(val, zoom)
            }
        },
        'center.lng' (val, oldVal) {
            const {T, map, zoom, center} = this;
            if (val !== oldVal && val >= -180 && val <= 180) {
                map.centerAndZoom(new T.Point(val, center.lat), zoom)
            }
        },
        'center.lat' (val, oldVal) {
            const {T, map, zoom, center} = this;
            if (val !== oldVal && val >= -74 && val <= 74) {
                map.centerAndZoom(new T.Point(center.lng, val), zoom)
            }
        },
        zoom (val, oldVal) {
            const {map} = this;
            if (val !== oldVal && val >= 3 && val <= 19) {
                map.setZoom(val)
            }
        },
        minZoom (val) {
            const {map} = this;
            map.setMinZoom(val)
        },
        maxZoom (val) {
            const {map} = this;
            map.setMaxZoom(val)
        },
        mapType (val) {
            const {map} = this;
            map.setMapType(global[val])
        },
        dragging (val) {
            const {map} = this;
            val ? map.enableDrag() : map.disableDrag()
        },
        scrollWheelZoom (val) {
            const {map} = this;
            val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
        },
        doubleClickZoom (val) {
            const {map} = this;
            val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
        },
        keyboard (val) {
            const {map} = this;
            val ? map.enableKeyboard() : map.disableKeyboard()
        },
        inertialDragging (val) {
            const {map} = this;
            val ? map.enableInertia() : map.disableInertia()
        },
        continuousZoom (val) {
            const {map} = this;
            val ? map.enableContinuousZoom() : map.disableContinuousZoom()
        },
        pinchToZoom (val) {
            const {map} = this;
            val ? map.enablePinchToZoom() : map.disablePinchToZoom()
        },
        autoResize (val) {
            const {map} = this;
            val ? map.enableAutoResize() : map.disableAutoResize()
        },
        theme (val) {
            const {map} = this;
            map.setStyle(val)
        }
    },
    methods: {
        setMapOptions () {
            const {map, minZoom, maxZoom, mapType, dragging, scrollWheelZoom, doubleClickZoom, keyboard, inertialDragging, continuousZoom, pinchToZoom, autoResize} = this
            minZoom && map.setMinZoom(minZoom);
            maxZoom && map.setMaxZoom(maxZoom);
            mapType && map.setMapType(global[mapType]);
            dragging ? map.enableDrag() : map.disableDrag();
            scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
            doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();
            keyboard ? map.enableKeyboard() : map.disableKeyboard();
            inertialDragging ? map.enableInertia() : map.disableInertia();
            continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom();
            //pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom();
            autoResize ? map.enableAutoResize() : map.disableAutoResize();
        },
        init (T) {
            if (this.map) {
                return
            }
            let $el = this.$refs.view;
            for (let $node of this.$slots.default || []) {
                if ($node.componentOptions && $node.componentOptions.tag === 'bm-view') {
                    this.hasTmView = true;
                    $el = $node.elm;
                }
            }
            const map = new T.Map($el);
            this.map = map;
            const {setMapOptions, zoom, getCenterPoint} = this;
            setMapOptions();
            bindEvents.call(this, map);
            map.checkResize();
            map.centerAndZoom(getCenterPoint(), zoom);
            this.$emit('ready', {T, map})
        },
        getCenterPoint () {
            const {center, T} = this;
            switch (checkType(center)) {
                case 'String': return center;
                case 'Object': return new T.LngLat(center.lng,center.lat);
                default: return new T.LngLat()
            }
        },
        initMap (T) {
            this.T = T;
            this.init(T)
        },
        reset () {
            const {initMap} = this;
            initMap(window.T);
        }
    },
    mounted () {
        this.reset()
    },
    data () {
        return {
            hasTmView: false
        }
    }
}
</script>
