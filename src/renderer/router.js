import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/players',
		name: 'PlayersList',
		component: () => import('./views/player/List')
	},
	{
		path: '/players/create',
		name: 'CreatePlayer',
		component: () => import('./views/player/Create')
	},
	{
		path: '/players/:id/edit',
		name: 'PlayerEdit',
		component: () => import('./views/player/Edit')
	},
	{
		path: '/players/:id',
		name: 'PlayerView',
		component: () => import('./views/player/View'),
		beforeEnter: (to, from, next) => {
			store.dispatch('GET_PLAYER_DATA', to.params.id)
			.then(data => {
				store.commit('SET_PLAYERS', store.state.players.filter(p => p.id != data.id).concat([data]))
				next()
			})
		},
		children: [{
			path: 'membership/new',
			name: 'UpMembershipForm',
			component: () => import('./views/player/membership/Up')
		},
		{
			path: 'membership/:membership/down',
			name: 'DownMembershipForm',
			component: () => import('./views/player/membership/Down')
		},
		{
			path: 'subscription/new',
			name: 'UpSubscriptionForm',
			component: () => import('./views/player/subscription/Up')
		},
		{
			path: 'subscription/:subscription/down',
			name: 'DownSubscriptionForm',
			component: () => import('./views/player/subscription/Down')
		},
		{
			path: 'signing/new',
			name: 'NewSigningForm',
			component: () => import('./views/player/signing/Up')
		},
		{
			path: 'signing/:signing/down',
			name: 'DownSigningForm',
			component: () => import('./views/player/signing/Down')
		},
		{
			path: 'rates/new',
			name: 'NewRateForm',
			component: () => import('./views/player/rates/Up')
		},
		{
			path: 'rates/:rate/edit',
			name: 'EditRateForm',
			component: () => import('./views/player/rates/Edit')
		}]
	},
	{
		path: '/fees',
		name: 'FeeList',
		component: () => import('./views/fees/List'),
		children: [{
			path: ':id/edit',
			name: 'FeeEdit',
			component: () => import('./views/fees/Edit')
		}]
	},
	{
		path: '/debit',
		name: 'DebitList',
		component: () => import('./views/debit/List')
	},
	{
		path: '/',
		name: 'InvoiceList',
		component: () => import('./views/invoices/List'),
		beforeEnter: (to, from, next) => {
			store.dispatch('SELECT_INVOICES').then(next)
		},
		children: [{
			path: '/invoices/:invoice/due/:due/edit',
			name: 'InvoiceDueEdit',
			component: () => import('./views/invoices/EditDue')
		}]
	},
	{
		path: '/invoices/create',
		name: 'CreateInvoice',
		component: () => import('./views/invoices/Create')
	},
	{
		path: '/invoices/:id/edit',
		name: 'InvoiceEdit',
		component: () => import('./views/invoices/Edit')
	},
	{
		path: '/expenses',
		name: 'ExpenseList',
		component: () => import('./views/expenses/List')
	},
	{
		path: '/expenses/create',
		name: 'CreateExpense',
		component: () => import('./views/expenses/Create')
	},
	{
		path: '/expenses/:id/edit',
		name: 'ExpenseEdit',
		component: () => import('./views/expenses/Edit')
	}]
})
