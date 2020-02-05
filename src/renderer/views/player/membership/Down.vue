<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Dar de baja membresia</h5>
						<button type="button" class="close" @click="close">
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-6">
								<label>Fecha de Baja</label>
								<v-date-picker ref="date" mode="single" v-model="membership.date_down" :input-props="{class: 'form-control'}" :disabled-dates="{start : new Date()}"></v-date-picker>
							</div>
							<div class="form-group col-12">
								<label for="exampleFormControlTextarea1">Notas</label>
								<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;" v-model="membership.notes"></textarea>
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
	export default	{
		data() {
			return {
				membership: (this.$parent.player.memberships || []).find(m => m.id == this.$route.params.membership) || { date_down: null, notes: null }
			}
		},
		methods: {
			save() {
				this.$store.dispatch('UPDATE_MEMBERSHIP_PLAYER', { id: this.$route.params.membership, data: this.membership }).then(this.close)
			},
			close() {
				this.$router.push({ name: 'PlayerView', params: { id: this.$route.params.id } })
			}
		}
	}
</script>
