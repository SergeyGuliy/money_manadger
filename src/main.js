import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate/src'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messageToast from './plagins/message.toast'
import Loader from './components/Loader'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import tooltipDirective from './directives/tooltip.directive'
import Paginate from 'vuejs-paginate'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.use(Vuelidate)
Vue.use(messageToast)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyDs5I_IPNBFQ3zj23nivHysz5nQttZW304',
  authDomain: 'money-manadger.firebaseapp.com',
  databaseURL: 'https://money-manadger.firebaseio.com',
  projectId: 'money-manadger',
  storageBucket: 'money-manadger.appspot.com',
  messagingSenderId: '579394387695',
  appId: '1:579394387695:web:ed4d9a4120acdaf2b1651a',
  measurementId: 'G-L28F466NNZ'
})

let app

firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
