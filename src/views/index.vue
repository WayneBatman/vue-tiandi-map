<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <TMap :areaHeight="areaHeight" :zoom="zoom" :center="mapCenter"></TMap>
    </div>
</template>
<script>
    import TMap from "../components/tmap";
    export default {
        components: {TMap},
        props: {
            msg: String
        },
        created(){
            this.areaHeight = document.documentElement.clientHeight - 150;
        },
        data(){
            return {
                wheelZoom:true,
                areaHeight:0,
                zoom:12,
                mapCenter:{
                    lng:113.2574,
                    lat:22.99652
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
