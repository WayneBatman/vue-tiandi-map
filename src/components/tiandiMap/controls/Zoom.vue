<template>

</template>

<script>
    import commonMixin from '../base/mixins/common.js'

    export default {
        name: "tm-zoom",
        render () {},
        mixins: [commonMixin('control')],
        props:{
            position: {
                type: String
            },
            zoomInText: {
                type: Object
            },
            zoomOutText: {
                type: String
            },
            zoomInTitle: {
                type: String
            },
            zoomOutTitle: {
                type: String
            }
        },
        watch:{
            position () {
                this.reload()
            },
            zoomInText () {
                this.reload()
            },
            zoomOutText () {
                this.reload()
            },
            zoomInTitle () {
                this.reload()
            },
            zoomOutTitle () {
                this.reload()
            }
        },
        methods:{
            load () {

                const {T, map, position} = this;
                this.originInstance = new T.Control.Zoom({
                    position:global[position||'T_ANCHOR_BOTTOM_RIGHT']
                });
                map.addControl(this.originInstance);
            }
        }

    }
</script>

<style scoped>

</style>
