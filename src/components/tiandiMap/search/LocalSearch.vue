<template>
    <div v-show="panel">
        <slot></slot>
    </div>
</template>

<script>
    import {createLngLat, createLngLatBounds} from '../base/factory.js'
    //import {isPoint} from '../base/util.js'
    import commonMixin from '../base/mixins/common.js'

    export default {
        name: "bm-local-search",
        mixins: [commonMixin('search')],
        props:{
            queryType: {
                type: Number
            },
            keyword: {
                type: [Array, String]
            },
            panel: {
                type: Boolean,
                default: true
            },
            bounds: {
                type: Object
            },
            nearby: {
                type: Object
            },
            pageCapacity: {
                type: Number
            }
        },
        watch:{
            queryType (val) {
                this.originInstance && this.originInstance.setQueryType(val)
            },
            keyword () {
                this.search()
            },
            bounds: {
                handler (val) {
                    const {searchInBounds} = this;
                    searchInBounds(val)
                },
                deep: true
            },
            nearby: {
                handler (val) {
                    const {searchNearby} = this;
                    searchNearby(val)
                },
                deep: true
            },
            pageCapacity (val) {
                this.originInstance && this.originInstance.setPageCapacity(val)
            }
        },
        methods:{
            searchNearby (nearby) {
                const {originInstance, keyword, T} = this;
                originInstance.searchNearby(keyword, createLngLat(T, nearby.center), nearby.radius)
            },
            searchInBounds (bounds) {
                const {originInstance, keyword, customData, T} = this;
                originInstance.searchInBounds(keyword, createLngLatBounds(T, bounds), customData)
            },
            search () {
                const {originInstance, keyword,queryType, nearby, bounds, searchNearby, searchInBounds} = this;
                nearby ? searchNearby(nearby):
                    bounds ? searchInBounds(bounds) :
                        originInstance.search(keyword,queryType);
            },
            load () {
                const instance = this;
                const {T,map, search, pageCapacity,  originInstance} = this;
                const route = this.originInstance = new T.LocalSearch(map,{
                    pageCapacity: pageCapacity,
                    onSearchComplete : (e) =>{
                        if (originInstance && originInstance !== route) {
                            originInstance.clearResults()
                        }
                        console.log(e);
                        instance.$emit('searchcomplete', e)
                    }
                });
                search();
            }
        }
    }
</script>

<style scoped>

</style>
