import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		name: 'Home',
		component: () => import('./views/home/Index')
	},
	{
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
		children: [{
			path: 'notes/new',
			name: 'newPlayerNote',
			component: () => import('./views/player/notes/New')
		},
		{
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
		path: '/dues',
		name: 'DueList',
		component: () => import('./views/dues/List'),
		children: [{
			path: ':id/edit',
			name: 'DueEdit',
			component: () => import('./views/dues/Edit')
		},
		{
			path: 'create',
			name: 'CreateDue',
			component: () => import('./views/dues/Create')
		}]
	},
	{
		path: '/debit',
		name: 'DebitList',
		component: () => import('./views/debit/List')
	},
	{
		path: '/subscriptions',
		name: 'SubscriptionList',
		component: () => import('./views/subscriptions/List')
	},
	{
		path: '/',
		name: 'InvoiceList',
		component: () => import('./views/invoices/List'),
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
	},
	{
		path: '/notes',
		name: 'NoteList',
		component: () => import('./views/notes/List')
	}]
})
