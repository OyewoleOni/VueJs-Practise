import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, bind, vnode){
    // el.style.backgroundColor = 'green';
    // el.style.backgroundColor = bind.value;
    var delay = 0;
    if(bind.modifiers['delayed']){
      delay = 3000;
    }
    setTimeout(() => {
      if(bind.arg =='background'){
        el.style.backgroundColor = bind.value;
      } else{
        el.style.color = bind.value;
      }
    },delay)
    
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
