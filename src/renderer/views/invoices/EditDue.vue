<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Editar cuota</h5>
						<button type="button" class="close" @click="close">
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-3">
								<label>Monto</label>
								<div class="input-icon">
									<span class="input-icon-addon">$</span>
									<cleave v-model="due.amount" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control"/>
								</div>
							</div>
							<div class="form-group col-md-4">
								<label>Fecha de vencimiento</label>
								<v-date-picker ref="date" mode="single" v-model="expiration" :input-props="{class: 'form-control'}" :disabled-dates="{ end : invoice.date }"></v-date-picker>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary btn-sm" @click.prevent="close">Cerrar</button>
						<button type="button" class="btn btn-primary btn-sm" @click.prevent="save">Guardar</button>
					</div>
				</form>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
	</div>
</template>

<script>
	import Cleave from 'vue-cleave-component'
	
	export default	{
		components: { Cleave },
		data() {
			var invoice = { ...this.$store.state.invoices.find(i => i.id == this.$route.params.invoice) }
			var due = { ...invoice.dues.find(d => d.id == this.$route.params.due) }
			
			return { invoice, due }
		},
		computed: {
			expiration: {
				get() {
					return new Date(this.due.expiration)
				},
				set(a) {
					this.due.expiration = a
				}
			}
		},
		methods: {
			save() {
				this.$store.dispatch('UPDATE_INVOICE_DUE', { id: this.$route.params.due, data: this.due }).then(this.close)
			},
			close() {
				this.$router.push({ name: 'InvoiceList' })
			}
		}
	}
</script>
