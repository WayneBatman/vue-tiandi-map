<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import commonMixin from '../base/mixins/common.js'
    import bindEvents from '../base/bindEvent.js'
    import {createLngLat,createIcon} from "../base/factory";

    import blueMarkerIcon from '../../../images/blueMarkerIcon.png'

    export default {
        name: "tm-marker",
        mixins: [commonMixin('overlay')],
        props:{
            lngLat: {},
            icon:{},
            dragging: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: Number
            },
            opacity:{
                type: Number
            },
            title:{
                type:String
            }
        },
        watch:{
            'lngLat.lng'(val,oldVal) {
                const {T,originInstance,lngLat,renderByParent,$parent} = this;

                if(val !== oldVal && val >= -180 && val <=180){
                    originInstance.setLngLat(createLngLat(T,{lng:val,lat:lngLat.lat}))
                }

                renderByParent && $parent.reload();
            },
            'lngLat.lat'(val,oldVal) {
                const {T,originInstance,lngLat,renderByParent,$parent} = this;

                if(val !== oldVal && val >= -74 && val <=74){
                    originInstance.setLngLat(createLngLat(T,{lng:lngLat.lng,lat:val}))
                }

                renderByParent && $parent.reload();
            },
            icon:{
               deep:true,
               handler (val) {
                   const {T,originInstance} = this;
                   originInstance && originInstance.setIcon(createIcon(T,val));
               }
            },
            dragging (val) {
                val? this.originInstance.enableDragging():this.originInstance.disableDragging();
            },
            zIndex (val) {
                this.originInstance.setZIndexOffset(val);
            },
            opacity (val) {
                this.originInstance.setOpacity(val);
            }
        },
        methods:{
            load() {
                const {T,map,lngLat,icon,dragging,zIndex,opacity,title,$parent,renderByParent} =this;
                const overlay = new T.Marker(createLngLat(T,lngLat),{
                    icon: (icon && createIcon(T,icon)) || createIcon(T,{url:blueMarkerIcon}),
                    draggable:dragging || false,
                    zIndexOffset:zIndex||0,
                    opacity: opacity || 1.0,
                    title
                });
                this.originInstance = overlay;
                bindEvents.call(this,overlay);
                if (renderByParent) {
                    $parent.reload();
                } else {
                    map.addOverLay(overlay);
                }
            }
        }
    }
</script>

<style scoped>

</style>
