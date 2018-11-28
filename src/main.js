import Vue from 'vue'
import App from './App.vue'
import TiandiMap from './components/tiandiMap/index.js'

Vue.config.productionTip = false;

Vue.use(TiandiMap);

new Vue({
  render: h => h(App),
}).$mount('#app')
