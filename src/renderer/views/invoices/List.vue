<template>
	<div class="pb-2 mb-3">
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100">
			<div class="col-md-2 mr-0 d-none d-sm-block p-1">
				<router-link :to="{name: 'CreateInvoice'}" class="btn btn-block"><i class="fe fe-edit mr-2"></i>Nuevo</router-link>
			</div>
			<div class="p-1" style="width:360px">
				<v-date-picker ref="date" mode="range" :columns="2" v-model="date_a" :input-props="{class: 'form-control form-control-dark'}" readonly></v-date-picker>
			</div>
			<div class="p-2 w-100">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th class="text-center" scope="col">Referencia</th>
							<th class="text-center" scope="col">Titulo</th>
							<th class="text-center" scope="col">Monto</th>
							<th class="text-center" scope="col">Fecha</th>
							<th scope="col">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in invoices">
							<td class="py-1 align-middle text-center">{{item.ref}}</td>
							<td class="py-1 align-middle text-center">{{item.subject}}</td>
							<td class="py-1 align-middle text-center">{{item.amount}}</td>
							<td class="py-1 align-middle text-center">{{item.date.toLocaleDateString()}}</td>
							<td class="py-1 align-middle text-right">
								<button type="button" class="btn btn-primary btn-sm" @click.prevent="$router.push({ name: 'InvoiceEdit', params: { id: item.id } })">Editar</button>
								<button type="button" class="btn btn-danger btn-sm" @click.prevent="$store.dispatch('DELETE_INVOICE', item.id)">Eliminar</button>
							</td>
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
				date_a: null,
				date_b: null,
				search: ''
			}
		},
		computed: {
			invoices() {
				return this.$store.state.invoices.filter(p => this.search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) : 1)
			}
		},
		beforeCreate() { this.$store.dispatch('SELECT_INVOICES') }
	}
</script>
