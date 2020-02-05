import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'PlayersList',
		meta: { back: null },
		component: () => import('./views/player/List')
	},
	{
		path: '/players/create',
		name: 'CreatePlayer',
		meta: { back: 'PlayersList' },
		component: () => import('./views/player/Create')
	},
	{
		path: '/players/:id/edit',
		name: 'PlayerEdit',
		meta: { back: 'PlayersList' },
		component: () => import('./views/player/Edit')
	},
	{
		path: '/players/:id',
		name: 'PlayerView',
		component: () => import('./views/player/View'),
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
		meta: { back: null },
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
		meta: { back: null },
		component: () => import('./views/debit/List')
	},
	{
		path: '/invoices',
		name: 'InvoiceList',
		meta: { back: null },
		component: () => import('./views/invoices/List')
	},
	{
		path: '/invoices/create',
		name: 'CreateInvoice',
		meta: { back: 'InvoiceList' },
		component: () => import('./views/invoices/Create')
	},
	{
		path: '/invoices/:id/edit',
		name: 'InvoiceEdit',
		meta: { back: 'InvoiceList' },
		component: () => import('./views/invoices/Edit')
	},
	{
		path: '/expenses',
		name: 'ExpenseList',
		meta: { back: null },
		component: () => import('./views/expenses/List')
	},
	{
		path: '/expenses/create',
		name: 'CreateExpense',
		meta: { back: 'ExpenseList' },
		component: () => import('./views/expenses/Create')
	},
	{
		path: '/expenses/:id/edit',
		name: 'ExpenseEdit',
		meta: { back: 'ExpenseList' },
		component: () => import('./views/expenses/Edit')
	}]
})
