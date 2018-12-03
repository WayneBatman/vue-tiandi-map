<template>

</template>

<script>
    import commonMixin from '../base/mixins/common.js'
    import bindEvents from '../base/bindEvent.js'
    import {createLngLat} from '../base/factory.js'
    export default {
        name: "tm-polygon",
        render () {},
        mixins: [commonMixin('overlay')],
        props:{
            path: {
                type: Array,
                default () {
                    return []
                }
            },
            color: {
                type: String,
                default: '#0000FF'
            },
            weight: {
                type: Number,
                default:3
            },
            opacity: {
                type: Number,
                default: 0.5
            },
            fillColor: {
                type: String,
                default: '#0000FF'
            },
            fillOpacity: {
                type: Number,
                default: 0.2
            },
            lineStyle: {
                type: String,
                default: 'solid'
            },
            editing: {
                type: Boolean,
                default: false
            }
        },
        watch:{
            path: {
                handler (val, oldVal) {
                    this.reload()
                },
                deep: true
            },
            color (val) {
                this.originInstance.setColor(val);
            },
            weight (val) {
                this.originInstance.setWeight(val);
            },
            opacity (val) {
                this.originInstance.setOpacity(val);
            },
            fillColor (val) {
                this.originInstance.setFillColor(val);
            },
            fillOpacity (val) {
                this.originInstance.setFillOpacity(val);
            },
            lineStyle (val) {
                this.originInstance.setLineStyle(val);
            },
            editing (val) {
                val ? this.originInstance.enableEdit() : this.originInstance.disableEdit();
            }
        },
        methods:{
            load () {
                const {T,map,path,color,weight,opacity,fillColor,fillOpacity,lineStyle,editing} = this;
                const overlay = new T.Polygon(
                    path.map(item => createLngLat(T,{lng: item.lng,lat:item.lat})),
                    {
                        color,
                        weight,
                        opacity,
                        fillColor,
                        fillOpacity,
                        lineStyle
                    }
                );
                this.originInstance = overlay;
                map.addOverLay(overlay);
                bindEvents.call(this,overlay);
            }
        }
    }
</script>

<style scoped>

</style>
