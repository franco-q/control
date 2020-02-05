<template>
	<div class="row">
		<form class="container" @submit.prevent="submit">
			<div class="row">
				<div class="form-group col-md-3">
					<label>Apellido</label>
					<input type="text" class="form-control" v-model="lastname">
				</div>
				<div class="form-group col-md-3">
					<label>Nombre</label>
					<input type="text" class="form-control" v-model="name">
				</div>
				<div class="form-group col-md-3">
					<label>Fecha de nacimiento</label>
					<v-date-picker ref="date" mode="single" v-model="borndate" :input-props="{class: 'form-control'}" :disabled-dates="{start : new Date()}"></v-date-picker>
				</div>
				<div class="form-group col-md-3">
					<label>Email</label>
					<input type="text" class="form-control" v-model="email">
				</div>
				<div class="form-group col-md-3">
					<label>Dirección</label>
					<input type="text" class="form-control" v-model="address">
				</div>
				<div class="form-group col-md-3">
					<label>Ciudad</label>
					<input type="text" class="form-control" v-model="city">
				</div>
				<div class="form-group col-md-3">
					<label>Telefono</label>
					<input type="text" class="form-control" v-model="tel_1">
				</div>
				<div class="form-group col-md-3">
					<label>Telefono alternativo</label>
					<input type="text" class="form-control" v-model="tel_2">
				</div>
				<div class="form-group col-md-3">
					<label>Identificación</label>
					<div class="input-group">
						<select class="custom-select" v-model="doc_type">
							<option value="DNI">DNI</option>
							<option value="OTRO">OTRO</option>
						</select>
						<input type="text" class="form-control" v-model="doc_num">
					</div>
				</div>
				<div class="form-group col-6">
					<label>Obra Social</label>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<div class="custom-control custom-switch">
									<input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="os.active"/>
									<label class="custom-control-label" for="customSwitch1">{{os.active ? 'SI' : 'NO'}}</label>
								</div>
							</div>
						</div>
						<input type="text" class="form-control" :disabled="!os.active" v-model="os.name">
						<input type="text" class="form-control" :disabled="!os.active" v-model="os.num">
					</div>
				</div>
				<div class="form-group col-md-3">
					<label class="d-block">Sexo</label>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="gengre_F" class="custom-control-input" value="F" v-model="gengre" />
						<label class="custom-control-label" for="gengre_F">Mujer</label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="gengre_M" class="custom-control-input" value="M" v-model="gengre" />
						<label class="custom-control-label" for="gengre_M">Hombre</label>
					</div>
				</div>
				<div class="form-group col-12">
					<label for="exampleFormControlTextarea1">Notas</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;" v-model="notes"></textarea>
				</div>
			</div>
			<button class="btn btn-primary" type="submit">Guardar</button>
		</form>
	</div>
</template>

<script>
	export default {

		name: 'Create',
		
		data() {
			return {
				name: null,
				lastname: null,
				doc_type: 'DNI',
				doc_num: null,
				born_date: null,
				gengre: null,
				email: null,
				address: null,
				city: null,
				tel_1: null,
				tel_2: null,
				notes: null,
				os: {
					active: false,
					name: null,
					num: null
				}
			}
		},

		computed: {
			borndate: {
				get() {
					return this.born_date ? new Date(this.born_date) : null
				},
				set(date) {
					this.born_date = date.toISOString().split('T')[0].replace(/-/g, '/')
				}
			}
		},

		watch: {
			os: {
				deep: true,
				handler({ active }) {
					if (!active) {
						this.os.name = null
						this.os.num = null
					}
				}
			}
		},

		methods: {
			submit() {
				var data = (({ name, lastname, doc_type, doc_num, gengre, email, address, city, tel_1, tel_2, notes, os }) => ({ name, lastname, doc_type, doc_num, gengre, email, address, city, tel_1, tel_2, notes }))(this.$data)
				
				if (this.os.active) {
					data.os_name = this.os.name
					data.os_num = this.os.num
				}
				if (this.born_date) {
					const born_date = new Date(this.born_date)
					if (born_date.getTime()) {
						data.born_date = born_date
						data.year = born_date.getFullYear()
					}
				}
				
				this.$store.dispatch('CREATE_PLAYER', data).then(() => this.$router.push({ path: '/' }))
			}
		}
	}
</script>
