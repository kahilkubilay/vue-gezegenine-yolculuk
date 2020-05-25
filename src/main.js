import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import TeamsA from './teams/TeamA.vue'
import TeamsB from './teams/TeamB.vue'
import Ship from './teams/Spaceship.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('team-a', TeamsA);
Vue.component('team-b', TeamsB);
Vue.component('ship', Ship);


new Vue({
  el: '#app',
  render: h => h(App)
})
