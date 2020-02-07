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
							<th class="" scope="col">Referencia</th>
							<th class="" scope="col">Status</th>
							<th class="" scope="col">Titulo</th>
							<th class="" scope="col">Fecha</th>
							<th class="" scope="col">Monto</th>
							<th scope="col">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="invoice in invoices">
							<tr>
								<td class="py-1 align-middle">{{invoice.ref}}</td>
								<td class="py-1 align-middle">{{invoice.status}}</td>
								<td class="py-1 align-middle">{{invoice.subject}}</td>
								<td class="py-1 align-middle">{{invoice.date.toLocaleDateString()}}</td>
								<td class="py-1 align-middle">$ {{invoice.amount}}</td>
								<td class="py-1 align-middle text-right">
									<button class="icon btn btn-sm" @click.prevent="(index => index >= 0 ? dues.splice(index, 1) : dues.push(invoice.id))(dues.indexOf(invoice.id))" v-if="invoice.dues.length">
										<i class="fe" :class="dues.indexOf(invoice.id) >= 0 ? 'fe-chevrons-up': 'fe-chevrons-down'"></i>
									</button>
									<button class="icon btn btn-sm" title="Editar" @click.prevent="$router.push({ name: 'InvoiceEdit', params: { id: invoice.id } })">
										<i class="fe fe-edit"></i>
									</button>
									<button class="icon btn btn-sm" @click.prevent="$store.dispatch('DELETE_INVOICE', invoice.id)">
										<i class="fe fe-trash"></i>
									</button>
								</td>
							</tr>
							<template v-if="invoice.dues.length && dues.find(id => id == invoice.id)">
								<tr v-for="(due, i) in invoice.dues" class="table-secondary">
									<td class="py-1 align-middle border-0">{{due.subject || 'Cuota ' + (i+1)}}</td>
									<td class="py-1 align-middle border-0" colspan="2">{{due.status}}</td>
									<td class="py-1 align-middle border-0">Vto: {{due.expiration.toLocaleDateString()}}</td>
									<td class="py-1 align-middle border-0">$ {{due.amount}}</td>
									<td class="py-1 align-middle border-0 text-right">
										<button class="icon btn btn-sm" title="Pagar" @click.prevent="pay(due)" v-if="due.status != 'success'">
											<i class="fe fe-circle"></i>
										</button>
										<button class="icon btn btn-sm" title="Marcar como no pagado" @click.prevent="unpay(due)" v-if="due.status == 'success'">
											<i class="fe fe-check-circle"></i>
										</button>
										<button class="icon btn btn-sm" title="Editar" @click.prevent="$router.push({ name: 'InvoiceDueEdit', params: { invoice: invoice.id, due: due.id } })">
											<i class="fe fe-edit"></i>
										</button>
										<button class="icon btn btn-sm" @click.prevent="$store.dispatch('DELETE_DUE', due.id)">
											<i class="fe fe-trash"></i>
										</button>
									</td>
								</tr>
								<tr class="table-warning">
									<td colspan="4" class="py-1 align-middle border-0">Cuotas pendientes: </td>
									<td colspan="2" class="py-1 align-middle border-0"><strong>$ {{invoice.dues.reduce((a, b) => b.status == 'success' ? a - parseInt(b.amount) : a, invoice.amount)}}</strong></td>
								</tr>
							</template>
						</template>
						<tr class="table-info">
							<td colspan="4" class="py-1 align-middle border-0">Total: </td>
							<!-- <td colspan="2" class="py-1 align-middle border-0"><strong>$ {{invoices.reduce((a, b) => a + parseInt(b.amount) - (b.dues || []).reduce((c,d) => d.status == 'success' ? c + parseInt(d.amount) : c, 0), 0)}}</strong></td> -->
							<td colspan="2" class="py-1 align-middle border-0"><strong>$ {{invoices.reduce((a, b) => a + parseInt(b.amount), 0)}}</strong></td>
						</tr>
						<!-- <tr class="table-info">
							<td colspan="3" class="py-1 align-middle border-0">Total: </td>
							<td colspan="2" class="py-1 align-middle border-0"><strong>$ {{invoices.reduce((a, b) => a + parseInt(b.amount) - .dues.reduce((a, b) => b.status == 'success' ? a - parseInt(b.amount) : a, invoice.amount), 0)}} {{invoices.reduce((a, b) => a + (b.dues || []).reduce((c,d) => d.status != 'success' ? c + parseInt(d.amount) : c, 0), 0)}}</strong></td>
						</tr> -->
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
				dues: [],
				date_a: null,
				date_b: null,
				search: ''
			}
		},
		computed: {
			total() {
				return this.$store.state.invoices.reduce((a, b) => a + parseInt(b.amount), 0)
			},
			invoices() {
				return this.$store.state.invoices.filter(p => this.search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) : 1)
			}
		},
		methods: {
			pay(due) {
				this.$store.dispatch('PAY_INVOICE_DUE', due).then(this.close)
			},
			unpay(due) {
				this.$store.dispatch('UNPAY_INVOICE_DUE', due).then(this.close)
			}
		}
	}
</script>
