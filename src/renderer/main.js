import Vue from 'vue'
import router from './router.js'
import App from './App'
import store from './store.js'
import VCalendar from 'v-calendar'

Vue.use(VCalendar, { firstDayOfWeek: 2 })

if (!process.env.IS_WEB) {
	Vue.use(require('vue-electron'))
}

Vue.config.productionTip = false

var vm = new Vue({
	components: { App },
	store,
	router,
	template: '<App/>'
})

store.dispatch('INIT').then(() => vm.$mount('#app'))
