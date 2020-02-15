<template>
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100">
			<div class="col-md-2 mr-0 d-none d-sm-block p-1">
				<router-link :to="{name: 'CreatePlayer'}" class="btn btn-block"><i class="fe fe-edit mr-2"></i>Nuevo</router-link>
			</div>
			<div class="p-1 w-100">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead class="thead-light">
						<tr>
							<th scope="col">Nombre</th>
							<th scope="col">Nacimiento</th>
							<!-- <th scope="col">Actividad</th> -->
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="player in $store.state.players.filter(p => search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(search.toLowerCase()) >= 0) : 1)">
							<td class="py-1 align-middle">{{player.lastname}} {{player.name}}</td>
							<td class="py-1 align-middle">{{ player.born_date ? player.born_date.toLocaleDateString() : '' }}</td>
							<!-- <td class="py-1 align-middle">{{player.sport}}</td> -->
							<td class="py-1 align-middle"><button type="button" class="btn btn-primary btn-sm" @click="$router.push({name: 'PlayerView', params: { id: player.id }})">Ver</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: null
			}
		},
		beforeCreate() { this.$store.dispatch('SELECT_PLAYERS') }
	}
</script>
