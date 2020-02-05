<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Editar tarifa</h5>
						<button type="button" class="close" @click="close">
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-12">
								<label>Titulo</label>
								<input type="text" class="form-control" v-model="rate.name">
							</div>
							<div class="form-group col-md-4">
								<label>Fecha de alta</label>
								<v-date-picker mode="single" v-model="rate.date_up" :input-props="{ class: 'form-control', readonly: true }" :from-date="start" :disabled-dates="start ? { start } : null"/>
							</div>
							<div class="form-group col-md-4">
								<label>Fecha de Baja</label>
								<v-date-picker mode="single" v-model="rate.date_down" :input-props="{ class: 'form-control', readonly: true }" :from-date="end" :disabled-dates="end ? { end } : null"/>
							</div>
							<div class="form-group col-md-4">
								<label>Valor</label>
								<cleave v-model="rate.value" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click.prevent="close">Cerrar</button>
						<button type="button" class="btn btn-primary" @click.prevent="save">Guardar</button>
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
			return {
				rate: (this.$parent.player.rates || []).find(m => m.id == this.$route.params.rate) || { name: null, date_up: null, date_down: null, value: null }
			}
		},
		methods: {
			save() {
				this.$store.dispatch('UPDATE_RATE_PLAYER', { id: this.$route.params.rate, data: this.rate }).then(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		},
		computed: {
			start() {
				return this.rate.date_down ? (d => d.setMonth(d.getMonth() - 1))(new Date(this.rate.date_down)) : null
			},
			end() {
				return this.rate.date_up ? (d => d.setMonth(d.getMonth() + 1))(new Date(this.rate.date_up)) : null
			}
		}
	}
</script>
