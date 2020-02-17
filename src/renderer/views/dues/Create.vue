<template>
	<div>
		<div class="modal fade show"style="display: block;">
			<div class="modal-dialog modal-dialog-centered">
				<form class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Crear cuota</h5>
						<button type="button" class="close" @click="close">
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-8">
								<label>Categoria</label>
								<input type="text" class="form-control" v-model="model.title">
							</div>
							<div class="form-group col-4">
								<label>Actividad</label>
								<select class="custom-select" v-model="model.sport">
									<option value="RUGBY">RUGBY</option>
									<option value="HOCKEY">HOCKEY</option>
								</select>
							</div>
							<div class="form-group col-4">
								<label>Mes</label>
								<select class="custom-select" :disabled="months.every((m, i) => model.months.indexOf(i) >= 0)" @input="model.months.push(parseInt($event.target.value))" @change="$event.target.value = null">
									<option>Seleccione</option>
									<option v-for="(month, k) in months.filter((m, i) => model.months.indexOf(i) < 0)" :value="months.indexOf(month)">{{month}}</option>
								</select>
							</div>
							<div class="form-group col-4">
								<label>Año</label>
								<input v-model="model.year" type="number" class="form-control"/>
							</div>
							<div class="form-group col-4">
								<label>Valor</label>
								<div class="input-icon">
									<span class="input-icon-addon">$</span>
									<cleave v-model="model.value" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control"/>
								</div>
							</div>
							<div class="col-12 tags">
								<span class="tag" v-for="(month, k) in model.months">
									<span>{{months[month]}}</span>
									<a href="javascript:void(0)" class="tag-addon" @click.prevent="model.months.splice(k, 1)"><i class="fe fe-x"></i></a>
								</span>
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
			console.log(year)
			return {
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
				model: { year, title: null, sport: null, months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], value: null }
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
