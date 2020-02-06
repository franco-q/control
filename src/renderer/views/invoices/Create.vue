<template>
	<div class="row">
		<form class="container" @submit.prevent="submit">
			<div class="row">
				<div class="form-group col-md-3">
					<label>Referencia</label>
					<input type="text" class="form-control" v-model="ref">
				</div>
				<div class="form-group col-md-3">
					<label>Titulo</label>
					<input type="text" class="form-control" v-model="subject">
				</div>
				<div class="form-group col-md-3">
					<label>Fecha</label>
					<v-date-picker ref="date" mode="single" v-model="date" :input-props="{class: 'form-control'}" :disabled-dates="{start : new Date()}"/>
				</div>
				<div class="form-group col-md-3">
					<label>Monto</label>
					<div class="input-icon">
						<span class="input-icon-addon">$</span>
						<input type="text" class="form-control" v-model="amount">
					</div>
				</div>
				<div class="form-group col-12" v-if="notes !== null">
					<label>Notas</label>
					<textarea class="form-control" rows="3" style="resize: none;" v-model="notes"></textarea>
				</div>
			</div>
			<!-- <h3 class="border-top my-2 pt-3">Cuotas</h3> -->
			<div class="row_ d-flex" v-for="due in dues">
				<div class="form-group mr-2">
					<div class="input-icon">
						<span class="input-icon-addon">$</span>
						<cleave v-model="due.amount" :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }" class="form-control form-control-sm" style="width:120px"/>
					</div>
				</div>
				<div class="form-group">
					<div class="input-icon mb-3">
						<span class="input-icon-addon">
							<i class="fe fe-calendar"></i>
						</span>
						<v-date-picker ref="date" mode="single" v-model="due.expiration" :input-props="{class: 'form-control form-control-sm'}" :disabled-dates="{end : new Date()}"/>
					</div>
				</div>
			</div>
			<button class="btn btn-outline-secondary" @click.prevent="dues.push({ amount: null, expiration: null })">Agegar cuota</button>
			<button class="btn btn-outline-secondary" v-if="notes === null" @click.prevent="notes = ''">Agegar notas</button>
			<button class="btn btn-primary" type="submit">Guardar</button>
			<button class="btn btn-gray" type="submit" @click.prevent="$router.push({ name: 'InvoiceList' })">Cancelar</button>
		</form>
	</div>
</template>

<script>
	import Cleave from 'vue-cleave-component'
	
	export default	{
		components: { Cleave },
		data() {
			return {
				dues: [],
				ref: null,
				subject: null,
				date: null,
				amount: null,
				notes: null
			}
		},
		computed: {
		},
		watch: {
		},
		methods: {
			submit() {
				var data = (({ ref, subject, amount, notes, dues }) => ({ ref, subject, amount, notes, dues }))(this.$data)
				
				if (this.date) {
					const date = new Date(this.date)
					if (date.getTime()) {
						data.date = date
					}
				}
				
				this.$store.dispatch('CREATE_INVOICE', data).then(() => this.$router.push({ name: 'InvoiceList' }))
			}
		}
	}
</script>
