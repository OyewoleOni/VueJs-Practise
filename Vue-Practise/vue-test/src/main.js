import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import Header from './components/Header.vue'
import HelloJs from 'hellojs/dist/hello.all.min.js'
import VueHello from 'vue-hellojs'
import Grid from './components/Grid.vue'
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false

Vue.use(VueResource)

HelloJs.init({
  google: '1079865103857-t5uprl3n17rvfjqaf3va9lho686617e6.apps.googleusercontent.com',
  // facebook: '179592556483761'
}, {
  redirect_uri: 'authcallback/'
})

Vue.use(VueHello, HelloJs)

export const eventBus = new Vue()


Vue.component('app-header', Header)
Vue.component('app-Grid', Grid)
Vue.component('font-awesome-icon', require('vue-fontawesome-icon/VueFontawesome.vue').default);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
