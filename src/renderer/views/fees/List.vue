<template>
	<div class="pb-2 mb-3">
		<div class="w-100 mr-2">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th scope="col">Año</th>
							<th class="text-center" scope="col">Categoria</th>
							<th class="text-center" scope="col">Actividad</th>
							<th class="text-center" scope="col">Valor</th>
							<th scope="col">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="fee in fees">
							<td class="py-1 align-middle">{{fee.year}}</td>
							<td class="py-1 align-middle text-center">{{fee.categ}}</td>
							<td class="py-1 align-middle text-center">{{fee.sport}}</td>
							<td class="py-1 align-middle text-center">{{fee.value}}</td>
							<td class="py-1 align-middle text-right"><button type="button" class="btn btn-primary btn-sm" @click="$router.push({name: 'FeeEdit', params: { id: fee.id }})">Editar</button></td>
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
		computed: {
			fees() {
				return this.$store.state.fees
			}
		},
		beforeCreate() { this.$store.dispatch('SELECT_FEES') }
	}
</script>
