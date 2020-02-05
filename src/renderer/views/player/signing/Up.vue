<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Agregar Subscripción</h5>
						<button type="button" class="close" @click="close">
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-6">
								<label>Fecha de Alta</label>
								<v-date-picker ref="date" mode="single" v-model="date_up" :input-props="{class: 'form-control'}" />
							</div>
							<div class="form-group col-md-6">
								<label>Fecha de Baja</label>
								<v-date-picker ref="date" mode="single" v-model="date_down" :input-props="{class: 'form-control'}" />
							</div>
							<div class="form-group col-12">
								<label for="exampleFormControlTextarea1">Notas</label>
								<textarea class="form-control" rows="3" style="resize: none;" v-model="notes"></textarea>
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
	export default	{

		name: 'up-signing',

		data: () => ({ date_up: null, notes: null, date_down: null }),

		methods: {
			save() {
				this.$store.dispatch('UP_SIGNING_PLAYER', { ...this.$data, player_id: this.$route.params.id }).finally(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		}
	}
</script>
