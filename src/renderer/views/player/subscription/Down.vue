<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Dar de baja subscripción</h5>
						<button type="button" class="close" @click="close">
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-6">
								<label>Fecha de Alta</label>
								<div class="form-control-plaintext">
									<strong>{{subscription.date_up.toLocaleDateString()}}</strong>
								</div>
							</div>
							<div class="form-group col-md-6">
								<label>Fecha de Baja</label>
								<v-date-picker ref="date" mode="single" v-model="subscription.date_down" :input-props="{ class: 'form-control', readonly: 1 }"/>
							</div>
							<div class="form-group col-12">
								<label for="exampleFormControlTextarea1">Notas</label>
								<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;" v-model="subscription.notes"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-secondary" @click.prevent="close">Cerrar</button>
						<button type="button" class="btn btn-sm btn-primary" @click.prevent="save">Guardar</button>
					</div>
				</form>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
	</div>
</template>

<script>
	export default	{
		data() {
			return {
				subscription: Object.assign({ date_down: null, notes: null, date_up: null }, this.$store.state.subscriptions.find(m => m.id == this.$route.params.subscription))
			}
		},
		methods: {
			save() {
				this.$store.dispatch('UPDATE_SUBSCRIPTION_PLAYER', { id: this.$route.params.subscription, data: this.subscription }).then(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		}
	}
</script>
