<template>
	<div class="pb-2 mb-3">
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100">
			<div class="col-md-2 mr-0 d-none d-sm-block p-1">
				<button class="btn btn-block"><i class="fe fe-file-plus mr-2"></i>Importar</button>
			</div>
			<div class="p-1 w-100">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th class="text-center" scope="col">Id</th>
							<th class="text-center" scope="col">Dni</th>
							<th class="text-center" scope="col">Status</th>
							<th class="text-center" scope="col">Fecha</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="debit in debits">
							<td class="py-1 align-middle">{{debit.id}}</td>
							<td class="py-1 align-middle text-center">{{debit.dni}}</td>
							<td class="py-1 align-middle text-center">{{debit.status}}</td>
							<td class="py-1 align-middle text-center">{{debit.date}}</td>
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
				search: ''
			}
		},
		computed: {
			debits() {
				return this.$store.state.debits
			}
		},
		beforeCreate() { this.$store.dispatch('SELECT_DEBITS') }
	}
</script>
