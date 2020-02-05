<template>
	<div class="row">
		<form class="container" @submit.prevent="submit">
			<div class="row">
				<div class="form-group col-md-3">
					<label>Referencia</label>
					<input type="text" class="form-control" v-model="model.ref">
				</div>
				<div class="form-group col-md-3">
					<label>Titulo</label>
					<input type="text" class="form-control" v-model="model.subject">
				</div>
				<div class="form-group col-md-3">
					<label>Fecha</label>
					<v-date-picker ref="date" mode="single" v-model="model.date" :input-props="{class: 'form-control'}" :disabled-dates="{start : new Date()}"></v-date-picker>
				</div>
				<div class="form-group col-md-3">
					<label>Monto</label>
					<input type="text" class="form-control" v-model="model.amount">
				</div>
				<div class="form-group col-12">
					<label for="exampleFormControlTextarea1">Notas</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;" v-model="model.notes"></textarea>
				</div>
			</div>
			<button class="btn btn-primary" type="submit">Guardar</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: this.$store.state.expenses.find(f => f.id == this.$route.params.id) || { ref: null, subject: null, date: null, amount: null, notes: null }
			}
		},
		computed: {
		},
		watch: {
		},
		methods: {
			submit() {
				var data = (({ ref, subject, amount, notes }) => ({ ref, subject, amount, notes }))(this.$data.model)
				
				if (this.date) {
					const date = new Date(this.date)
					if (date.getTime()) {
						data.date = date
					}
				}
				
				this.$store.dispatch('UPDATE_EXPENSE', { id: this.$route.params.id, data }).then(() => this.$router.push({ name: 'ExpenseList' }))
			}
		}
	}
</script>
