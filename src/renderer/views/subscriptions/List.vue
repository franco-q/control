<template>
	<div class="pb-2 mb-3">
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100">
			<div class="col-md-2 mr-0 d-none d-sm-block p-1">
				<button class="btn btn-block"><i class="fe fe-download mr-2"></i>Exportar</button>
			</div>
			<div class="p-1 w-100">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<div class="form-group">
				<div class="form-label">Filtros</div>
				<div>
					<label class="custom-control custom-checkbox custom-control-inline">
						<input type="checkbox" class="custom-control-input" v-model="filter" :value="(date_down, today) => !date_down || date_down > today">
						<span class="custom-control-label">Activas</span>
					</label>
					<label class="custom-control custom-checkbox custom-control-inline">
						<input type="checkbox" class="custom-control-input" v-model="filter" :value="(date_down, today) => date_down && date_down <= today">
						<span class="custom-control-label">Inactivas</span>
					</label>
				</div>
			</div>
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th class="" scope="col">Socio</th>
							<th class="text-center" scope="col">Tarjeta</th>
							<th class="text-center" scope="col">Fecha de alta</th>
							<th class="text-center" scope="col">Fecha de baja</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in subscriptions">
							<td class="py-1 align-middle">
								<router-link :to="{name: 'PlayerView', params: { id: item.player_id }}">{{item.lastname}}, {{item.name}} - {{item.doc_num}}</router-link>
							</td>
							<td class="py-1 align-middle text-center">{{item.card_num}} - {{item.card_expiry.replace(/(\d{2})(\d{2})/, (s, m, y) => m + '/' + y)}}</td>
							<td class="py-1 align-middle text-center">{{item.date_up.toLocaleDateString()}}</td>
							<td class="py-1 align-middle text-center">{{item.date_down ? item.date_down.toLocaleDateString() : ''}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				filter: [],
				search: ''
			}
		},
		computed: {
			subscriptions() {
				var today = new Date()
				return this.$store.state.subscriptions
				.filter(p => this.search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) : 1)
				.filter(p => this.filter.length ? this.filter.some(f => f(p.date_down, today)) : 1)
			}
		}
	}
</script>
