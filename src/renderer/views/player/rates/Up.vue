<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Agregar tarifa</h5>
						<button type="button" class="close" @click="close">&nbsp;</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-12">
								<label>Titulo</label>
								<input type="text" class="form-control" v-model="name">
							</div>
							<div class="form-group col-md-4">
								<label>Fecha de alta</label>
								<v-date-picker mode="single" v-model="date_up" :input-props="{ class: 'form-control', readonly: true }" :from-date="start" :disabled-dates="start ? { start } : null"/>
							</div>
							<div class="form-group col-md-4">
								<label>Fecha de Baja</label>
								<v-date-picker mode="single" v-model="date_down" :input-props="{ class: 'form-control', readonly: true }" :from-date="end" :disabled-dates="end ? { end } : null"/>
							</div>
							<div class="form-group col-md-4">
								<label>Valor</label>
								<div class="input-icon">
									<span class="input-icon-addon">$</span>
									<cleave v-model="value" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control" />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click="close">Cerrar</button>
						<button type="button" class="btn btn-primary" @click="save">Guardar</button>
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

		data: () => ({ name: null, date_up: null, date_down: null, value: null }),

		methods: {
			save() {
				this.$store.dispatch('UP_RATE_PLAYER', { ...this.$data, player_id: this.$route.params.id }).finally(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		},
		computed: {
			start() {
				return this.date_down ? (d => d.setMonth(d.getMonth() - 1))(new Date(this.date_down)) : null
			},
			end() {
				return this.date_up ? (d => d.setMonth(d.getMonth() + 1))(new Date(this.date_up)) : null
			}
		}
	}
</script>
