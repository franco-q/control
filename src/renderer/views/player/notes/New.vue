<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Agregar Nota</h5>
						<button type="button" class="close" @click="close">&nbsp;</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-6">
								<label>Fecha</label>
								<v-date-picker ref="date" mode="single" v-model="date" :input-props="{class: 'form-control'}" :disabled-dates="{start : new Date()}" />
							</div>
							<div class="form-group col-md-6">
								<label class="form-label">Tipo</label>
								<div class="row gutters-xs">
									<div class="col-auto">
										<label class="colorinput">
											<input name="color" type="checkbox" value="info" class="colorinput-input" v-model="type">
											<span class="colorinput-color bg-azure"></span>
										</label>
									</div>
									<div class="col-auto">
										<label class="colorinput">
											<input name="color" type="checkbox" value="warning" class="colorinput-input" v-model="type">
											<span class="colorinput-color bg-red"></span>
										</label>
									</div>
									<div class="col-auto">
										<label class="colorinput">
											<input name="color" type="checkbox" value="danger" class="colorinput-input" v-model="type">
											<span class="colorinput-color bg-yellow"></span>
										</label>
									</div>
									<div class="col-auto">
										<label class="colorinput">
											<input name="color" type="checkbox" value="success" class="colorinput-input" v-model="type">
											<span class="colorinput-color bg-green"></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group col-12">
							<label>Notas</label>
							<textarea class="form-control" rows="3" style="resize: none;" v-model="note"></textarea>
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
	export default	{
		data: () => {
			return {
				notes : this.$store.state.players.find(p => p.id == this.$route.params.id).notes.concat([{ date: null, note: null, type: null }]),
			}
		},


		methods: {
			save() {
				this.$store.dispatch('UP_MEMBERSHIP_PLAYER', { ...this.$data, player_id: this.$route.params.id }).finally(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		}
	}
</script>
