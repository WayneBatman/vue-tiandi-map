<template>
  <div style="height: 1000px;width: 100%" >
    <TMap :areaHeight="areaHeight" :zoom="zoom" :center="mapCenter"></TMap>
  </div>
</template>

<script>
import TMap from "./tmap";
export default {
    name: 'HelloWorld',
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
                lng:113.263330,
                lat:22.926400
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
