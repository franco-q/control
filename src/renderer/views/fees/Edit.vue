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
							<div class="form-group col-md-4">
								<label>Actividad</label>
								<select class="custom-select" v-model="model.sport">
									<option value="RUGBY">RUGBY</option>
									<option value="HOCKEY">HOCKEY</option>
								</select>
							</div>
							<div class="form-group col-md-4">
								<label>Categoria</label>
								<input type="text" class="form-control" v-model="model.categ">
							</div>
							<div class="form-group col-md-4">
								<label>Valor</label>
								<div class="input-icon">
									<span class="input-icon-addon">$</span>
									<cleave v-model="model.value" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control"/>
								</div>
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
		beforeCreate() {
		},
		data() {
			var year = (d => d.getFullYear())(new Date())
			return {
				model: this.$store.state.fees.find(f => f.id == this.$route.params.id) || { year: null, categ: null, sport: null, value: null },
				years: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((e, t, n, s) => e.concat(s.map(e => t + '' + e)), []).filter(e => e <= 80).map(e => year - e)
			}
		},
		methods: {
			save() {
				this.$store.dispatch('UPDATE_FEE', { id: this.$route.params.id, data: this.model }).then(this.close)
			},
			close() {
				this.$router.push({ name: 'FeeList' })
			}
		}
	}
</script>
