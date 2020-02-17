<template>
	<div class="row row-cards">
		<div class="col-6 col-sm-4 col-lg-2">
			<div class="card">
				<div class="card-body p-3 text-center">
					<div class="text-right text-green">
						6%
						<i class="fe fe-chevron-up"></i>
					</div>
					<div class="h1 m-0">{{players.length}}</div>
					<div class="text-muted mb-4">Socios</div>
				</div>
			</div>
		</div>
		<div class="col-6 col-sm-4 col-lg-2">
			<div class="card">
				<div class="card-body p-3 text-center">
					<div class="text-right text-red">
						-3%
						<i class="fe fe-chevron-down"></i>
					</div>
					<div class="h1 m-0">{{subscriptions.length}}</div>
					<div class="text-muted mb-4">Debitos Automaticos</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			players() {
				return this.$store.state.players
			},
			subscriptions() {
				return this.$store.state.subscriptions
			}
		}
	}
</script>
