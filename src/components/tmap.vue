<template>
    <div class="map">
        <div :padding="0">
            <tiandi-map
                    class="map"
                    map-type="TMAP_HYBRID_MAP"
                    :zoom="zoom"
                    :scroll-wheel-zoom="wheelZoom"
                    :style="{display: 'flex', height: areaHeight+'px', flexDirection: 'column'}"
                    :center="center"
                    @moving="syncCenterAndZoom"
                    @moveend="syncCenterAndZoom"
                    @zoomend="syncCenterAndZoom"
                    @click="clickMap"
                    @ready="mapReady">
            </tiandi-map>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TMap',
        model: {
            prop: 'zoom',
            event: 'changeZoom'
        },
        props:{
            areaHeight: {
                type: Number,
                default: 400
            },
            zoom: {
                type: Number,
                default: 10
            },
            center:{
                type: [Object, String]
            },
            wheelZoom: {
                type: Boolean,
                default: ()=>{
                    return true;
                }
            },
            showMapType:{
                type: Boolean,
                default: true
            },
            addStatus:{
                type: Boolean,
                default: false
            },
            //是否显示搜索框
            showSearch:{
                type: Boolean,
                default: true
            },
        },
        data(){
            return {
                // 初始化类
                TMap: {},
                // 初始化实例
                map: {},
                // 右边控件offset
                addOffset: {},
                mapCenter: {},// 中心点
                searchValue: '',
                select:'map'
            }
        },
        methods:{
            search(){
                this.map.clearOverLays();
                console.log(this.searchValue);
                //this.searchObject.search(this.searchValue);
            },
            syncCenterAndZoom (e){
                if(this.showMapType){
                    const {lng, lat} = e.target.getCenter();
                    this.mapCenter = {};
                    this.mapCenter.lng = lng;
                    this.mapCenter.lat = lat;
                    this.$emit('changeZoom', e.target.getZoom());
                }
            },
            clickMap (e) {
                console.log(e);
                /*if(this.addStatus){
                    this.$emit('on-clickMap', e.lnglat);
                }
                else{
                    if (!this.editType) return false;
                    this.pointNumer += 1;
                    // if (this.pointNumer > 3) return false;
                    let polygonPath = this.polygonPath;
                    polygonPath.push(e.point);
                    this.polygonPath = polygonPath;
                }*/

            },
            mapReady (item){
                this.TMap = item.T;
                this.map = item.map;
                this.addOffset = {x: 30, y: 5};
            }
        }
    };
</script>

<style scoped>
    .blockTitle:hover{
        cursor: pointer;
    }
    .mapListTab{
        background-color: rgba(255,255,255,0.9);
        margin-top: 5px;
        overflow: hidden;
        max-height: 300px;
        overflow-y: auto;
    }
    .mapList{
        line-height: 2rem;
        padding: 10px;
    }
    .mapList:hover{
        background-color: rgba(255,255,255,0.98);
        cursor: pointer;
    }
</style>
