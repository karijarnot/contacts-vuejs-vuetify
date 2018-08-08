import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {ClientTable, Event} from 'vue-tables-2';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import './assets/glyphicons.css';

Vue.use(ClientTable, {}, false, 'bootstrap4', 'default');

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');