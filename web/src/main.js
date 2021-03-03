import Vue from 'vue'
import App from './App.vue'

import VueSocketIO from "vue-socket.io"
import io from "socket.io-client"

Vue.use(new VueSocketIO({
  connection: io("http://localhost:3000")
}))

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
