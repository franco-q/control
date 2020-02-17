<template>
	<div>
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100 bg-light">
			<div class="col-2 mr-0 p-1">
				<router-link :to="{name: 'CreatePlayer'}" class="btn btn-block"><i class="fe fe-edit mr-2"></i>Nuevo</router-link>
			</div>
			<div class="p-1 col-10">
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
						</tr>
					</thead>
					<tbody>
						<tr v-for="player in players" @click="$router.push({name: 'PlayerView', params: { id: player.id }})">
							<td class="py-1 align-middle">{{player.lastname}} {{player.name}}</td>
							<td class="py-1 align-middle">{{ player.born_date ? player.born_date.toLocaleDateString() : '' }}</td>
							<!-- <td class="py-1 align-middle">{{player.sport}}</td> -->
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
		computed: {
			players() {
				return this.$store.state.players.filter(p => this.search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) : 1)
			}
		}
	}
</script>
