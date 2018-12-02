<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import commonMixin from '../base/mixins/common.js'
    import {createPoint} from '../base/factory.js'
    export default {
        name: 'tm-control',
        mixins: [commonMixin('control')],
        props: ['position','offset'],
        watch: {
            position (val) {
                this.originInstance.setPosition(val)
            },
            offset (val) {
                const {T} =  this;
                let offset = createPoint(T,val);
                this.originInstance.setOffset(offset);
            }
        },
        methods: {
            load () {
                const {T, map, position,offset, $el} = this;
                const Control = function () {};
                Control.prototype = new T.Control();
                Control.prototype.setPosition(global[position || 'T_ANCHOR_TOP_LEFT']);
                Control.prototype.onAdd = map => map.getContainer().appendChild($el);
                this.originInstance = new Control();
                map.addControl(this.originInstance);
            }
        }
    };
</script>

<style scoped>

</style>
