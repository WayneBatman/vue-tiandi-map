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
                <tm-control v-if="showSearch" :offset="searchOffset" style="width: 300px;margin-top: 10px;margin-left: 20px;">
                    <Input placeholder="输入关键词搜索" icon="ios-search" v-model="searchValue" @on-click="search">
                    <Select v-model="select" slot="prepend" style="width: 80px">
                        <!--<Option value="parcel">地块</Option>-->
                        <Option value="map">地图</Option>
                    </Select>
                    </Input>
                </tm-control>
                <tm-polygon :path="polygonPath" :editing="true"></tm-polygon>
                <tm-marker :lngLat="markerItem" :title="`广州南站`"></tm-marker>
                <tm-local-search :keyword="searchMapKeyword" :panel="false" @searchcomplete="showSearchResult" ></tm-local-search>
                <tm-zoom :position="`T_ANCHOR_BOTTOM_RIGHT`"></tm-zoom>
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
                searchOffset:{},
                // 右边控件offset
                addOffset: {},
                mapCenter: {},// 中心点
                searchValue: '',
                // 搜索关键词
                searchMapKeyword: '',
                select:'map',
                polygonPath: [//用于记录当前地块的形状
                    {lng:113.2574,lat:22.99652},
                    {lng:113.26229,lat:22.9883},
                    {lng:113.25555,lat:22.98965},
                    {lng:113.25555,lat:22.98965}
                ],
                markerItem : {
                    lng:113.2574,
                    lat:22.99652
                }
            }
        },
        methods:{
            search(){
                this.map.clearOverLays();
                this.searchMapKeyword = this.searchValue;
            },
            showSearchResult (res) {
                console.log(res);
                if(!res){
                    return;
                }

                const {resultType,count,pois,area} = res;

                if (count>0){
                    const {getresultPois,getresultArea} = this;
                    //根据返回类型解析搜索结果
                    switch (parseInt(resultType)) {
                        case 1:
                            //解析点数据结果
                            getresultPois(pois);
                            break;
                        case 3:
                            //解析行政区划边界
                            getresultArea(area);
                            break;
                    }

                }
            },
            getresultPois (pois) {
                if(pois){
                    const {map,TMap,getCurrentCenterAndZoom} = this;
                    //坐标数组，设置最佳比例尺时会用到
                    let zoomArr = [];
                    pois.map(poi =>{
                        const {name,address,lonlat} = poi;
                        let lngLatArr = lonlat.split(" ");
                        let lngLat = new TMap.LngLat(lngLatArr[0], lngLatArr[1]);
                        let winHtml = "名称:" + name + "<br/>地址:" + address;
                        //创建标注对象
                        let marker = new TMap.Marker(lngLat);
                        //地图上添加标注点
                        map.addOverLay(marker);
                        //注册标注点的点击事件
                        let markerInfoWin = new TMap.InfoWindow(winHtml, {autoPan: true});
                        marker.addEventListener("click", function () {
                            marker.openInfoWindow(markerInfoWin);
                        });

                        zoomArr.push(lngLat);
                    });

                    map.setViewport(zoomArr);
                    getCurrentCenterAndZoom(map);

                }
            },
            getresultArea (objs) {
                if(objs) {
                    const {map,TMap,getCurrentCenterAndZoom} = this;
                    const {points,lonlat} = objs;
                    if(points){
                        //坐标数组，设置最佳比例尺时会用到
                        let pointsArr = [];
                        points.map(point =>{
                            let regionLngLats = [];
                            const { region } = point;
                            let regionArr = region.split(",");
                            regionArr.map(regionTemp => {
                                let lnglatArr = regionTemp.split(" ");
                                let lnglat = new TMap.LngLat(lnglatArr[0], lnglatArr[1]);
                                regionLngLats.push(lnglat);
                                pointsArr.push(lnglat);
                            });

                            //创建线对象
                            let line = new TMap.Polyline(regionLngLats, {
                                color: "blue",
                                weight: 3,
                                opacity: 1,
                                lineStyle: "dashed"
                            });

                            map.addOverLay(line);
                        });

                        map.setViewport(pointsArr);
                    }

                    if(lonlat){
                        var regionArr = lonlat.split(",");
                        this.map.panTo(new TMap.LngLat(regionArr[0], regionArr[1]));
                    }

                    getCurrentCenterAndZoom(map);
                }
            },
            getCurrentCenterAndZoom(map){
                let currentZoom = map.getZoom();
                let currentCenter = map.getCenter();
                let currentCenterStr = currentCenter.lat+','+currentCenter.lng;

                let mapParams = {
                    currentZoom :currentZoom,
                    currentCenter: currentCenterStr
                };

                this.$emit("on-searchReturnValue",mapParams);
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
                //console.log(e);
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
                this.searchOffset = {x:5,y:5};
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
