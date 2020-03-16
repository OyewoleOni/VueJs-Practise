import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import Grid from './components/Grid.vue'
import ConfirmationModal from './components/confimationModal.vue'
import VueResource from 'vue-resource'
import HelloJs from 'hellojs/dist/hello.all.min.js'
import VueHello from 'vue-hellojs'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import vuetify from './plugins/vuetify'

extend('required', {
  ...required,
  message: 'This field is required'
})

Vue.config.productionTip = false
Vue.use(VueResource)
HelloJs.init({
  google: '1079865103857-t5uprl3n17rvfjqaf3va9lho686617e6.apps.googleusercontent.com',
  facebook: '179592556483761'
}, {
  redirect_uri: 'authcallback/'
})
Vue.use(VueHello, HelloJs)

export const eventBus = new Vue()

Vue.component('app-header', Header)
Vue.component('app-grid', Grid)
Vue.component('app-nav', Navbar)
Vue.component('validation-provider', ValidationProvider)
Vue.component('app-confirmation', ConfirmationModal)

// Content-Type: application/json

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
