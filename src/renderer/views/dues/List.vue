<template>
	<div class="">
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100 bg-light">
			<div class="col-2 mr-0 p-1">
				<router-link :to="{name: 'CreateDue'}" class="btn btn-block"><i class="fe fe-edit mr-2"></i>Nuevo</router-link>
			</div>
			<div class="p-1 col-10">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<div class="form-group">
				<div class="selectgroup w-100">
					<label class="selectgroup-item" v-for="(item, k) in months" :key="k">
						<input type="radio" v-model="filter" :value="k" class="selectgroup-input">
						<span class="selectgroup-button">{{item}}</span>
					</label>
				</div>
			</div>
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th class="text-center" scope="col">Titulo</th>
							<th class="text-center" scope="col">Actividad</th>
							<th class="text-center" scope="col">Valor</th>
							<th scope="col">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="fee in dues">
							<td class="py-1 align-middle text-center">{{fee.title}}</td>
							<td class="py-1 align-middle text-center">{{fee.sport}}</td>
							<td class="py-1 align-middle text-center"><strong>$ {{fee.value}}</strong></td>
							<td class="py-1 align-middle text-right">
								<button class="icon btn btn-sm" title="Editar" @click.prevent="$router.push({name: 'FeeEdit', params: { id: fee.id }})">
									<i class="fe fe-edit"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				filter: 0,
				search: null,
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
			}
		},
		computed: {
			dues() {
				return this.$store.state.dues.filter(f => f.month == this.filter).filter(f => this.search ? JSON.stringify(f).toLowerCase().indexOf(this.search.toLowerCase()) >= 0 : 1)
			}
		}
	}
</script>
