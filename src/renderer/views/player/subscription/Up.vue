<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Agregar Subscripción</h5>
						<button type="button" class="close" @click="close">&nbsp;</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-6">
								<label>Fecha de alta</label>
								<v-date-picker ref="date" mode="single" v-model="date_up" :input-props="{class: 'form-control'}" />
							</div>
							<div class="form-group col-md-6">
								<label>Metodo de pago</label>
								<select class="custom-select" v-model="method">
									<option value="DB">DB</option>
									<option value="TC">TC</option>
									<option value="PM">PM</option>
								</select>
							</div>
							<div class="col-12 py-3 rounded-lg bg-light">
								<strong>Datos de la tarjeta</strong>
								<div class="row">
									<div class="form-group col-md-8">
										<label>Número</label>
										<cleave v-model="card_num" :options="{creditCard: true}" class="form-control"/>
									</div>
									<div class="form-group col-md-4">
										<label>Mes/año</label>
										<cleave v-model="card_expiry" :options="{date: true, datePattern: ['m', 'y']}" class="form-control"/>
									</div>
									<div class="form-group col-md-6">
										<label class="d-block">Tipo</label>
										<div class="custom-control custom-radio custom-control-inline">
											<input type="radio" name="card_type" id="card_typeC" class="custom-control-input" value="C" v-model="card_type">
											<label class="custom-control-label" for="card_typeC">Credito</label>
										</div>
										<div class="custom-control custom-radio custom-control-inline">
											<input type="radio" name="card_type" id="card_typeD" class="custom-control-input" value="D" v-model="card_type">
											<label class="custom-control-label" for="card_typeD">Debito</label>
										</div>
									</div>
									<div class="form-group col-md-6">
										<label>Operador</label>
										<select class="custom-select" v-model="card_operator">
											<option value="VISA">Visa</option>
										</select>
									</div>
								</div>
							</div>
							<div class="form-group col-12">
								<label for="exampleFormControlTextarea1">Notas</label>
								<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;" v-model="notes"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary btn-sm" @click="close">Cerrar</button>
						<button type="button" class="btn btn-primary btn-sm" @click="save">Guardar</button>
					</div>
				</form>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
	</div>
</template>
<script>
	import cleave from 'vue-cleave-component'
	export default	{
		components: { cleave },

		name: 'up-signing',

		data: () => ({ date_up: null, notes: null, method: null, card_num: null, card_expiry: null, card_operator: null, card_type: null }),

		methods: {
			save() {
				this.$store.dispatch('UP_SUBSCRIPTION_PLAYER', { ...this.$data, player_id: this.$route.params.id }).finally(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		}
	}
</script>
