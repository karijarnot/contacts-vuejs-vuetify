import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './App.vue';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'toastr/build/toastr.min.css';

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');