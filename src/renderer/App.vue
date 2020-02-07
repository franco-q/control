<template>
	<div id="app">
		<div class="container-fluid">
			<div class="row">
				<nav class="col-md-2 d-none d-md-block bg-light sidebar" v-if="!false">
					<div class="sidebar-sticky">
						<ul class="nav flex-column">
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'PlayersList'}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
									<span>Socios</span>
								</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'FeeList'}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
									<span>Tarifas</span>
								</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'DebitList'}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
									<span>Debitos</span>
								</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'ExpenseList'}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
									<span>Gastos</span>
								</router-link>
							</li>
							<li class="nav-item">
								<router-link class="nav-link" :to="{name: 'InvoiceList'}">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
									<span>Ingresos</span>
								</router-link>
							</li>
						</ul>
					</div>
				</nav>

				<main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
					<main class="pt-4">
						<router-view />
					</main>
					<div class="d-flex justify-content-center fixed-top w-100 vh-100 bg-light align-items-center" style="z-index:9999999999" v-if="$store.state.loading">
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
					<notification-win v-if="os === 'win32' && notifications" />
					<notification v-else-if="os !== 'win32' && notifications" />
				</main>
			</div>
		</div>
	</div>
</template>

<script>
	import Notification from '@/components/notification/Notification'
	import NotificationWin from '@/components/notification/Notification-win'
	import Titlebar from '@/components/Titlebar'

	export default {
		name: 'pomotroid',

		components: {
			Notification,
			NotificationWin,
			Titlebar
		},

		computed: {
			notifications() {
				return this.$store.getters.notifications
			},

			os() {
				return this.$store.getters.os
			}
		}
	}
</script>

<style lang="scss">
#app {
	min-height: 100vh;
}
body {
	font-size: .875rem;
}

.feather {
	width: 16px;
	height: 16px;
	vertical-align: text-bottom;
}

/*
 * Sidebar
 */

 .sidebar {
 	position: fixed;
 	top: 0;
 	bottom: 0;
 	left: 0;
 	z-index: 100; /* Behind the navbar */
 	padding: 46px 0 0; /* Height of navbar */
 	box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
 }

 .sidebar-sticky {
 	position: relative;
 	top: 0;
 	height: calc(100vh - 46px);
 	padding-top: .5rem;
 	overflow-x: hidden;
 	overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
 }

 @supports ((position: -webkit-sticky) or (position: sticky)) {
 	.sidebar-sticky {
 		position: -webkit-sticky;
 		position: sticky;
 	}
 }

 .sidebar .nav-link {
 	font-weight: 500;
 	color: #333;
 	padding: .5rem 1rem;
 }

 .sidebar .nav-link .feather {
 	margin-right: 4px;
 	color: #999;
 }

 .sidebar .nav-link.active {
 	color: #007bff;
 }

 .sidebar .nav-link:hover .feather,
 .sidebar .nav-link.active .feather {
 	color: inherit;
 }

 .sidebar-heading {
 	font-size: .75rem;
 	text-transform: uppercase;
 }

/*
 * Content
 */

 [role="main"] {
 	padding-top: 46px; /* Space for fixed navbar */
 }

/*
 * Navbar
 */

 .navbar-brand {
 	padding-top: .75rem;
 	padding-bottom: .75rem;
 	font-size: 1rem;
 	background-color: rgba(0, 0, 0, .25);
 	box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
 }

 .navbar .form-control {
 	padding: .75rem 1rem;
 	border-width: 0;
 	border-radius: 0;
 }

 .form-control-dark {
 	color: #fff;
 	background-color: rgba(255, 255, 255, .1);
 	border-color: rgba(255, 255, 255, .1);
 }

 .form-control-dark:focus {
 	border-color: transparent;
 	box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
 }
</style>
