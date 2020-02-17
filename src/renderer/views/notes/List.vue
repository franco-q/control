<template>
	<div>
		<nav class="navbar fixed-top flex-md-nowrap p-0 shadow w-100 bg-light">
			<div class="col-2 mr-0 p-1">
				<router-link :to="{name: 'CreateNote'}" class="btn btn-block"><i class="fe fe-edit mr-2"></i>Nuevo</router-link>
			</div>
			<div class="p-1 col-10">
				<input class="form-control form-control-dark w-100" type="text" v-model="search" placeholder="Buscar">
			</div>
		</nav>
		<div class="w-100 mr-2">
			<template v-for="item in notes">
				<div class="alert alert-dismissible">
					<button data-dismiss="alert" class="close"></button>
					<h4>{{item.date_up}}: {{item.title}}</h4>
					<p>{{item.text}}</p>
					<div class="btn-list">
						<button class="btn btn-success" type="button">Okay</button>
						<button class="btn btn-secondary" type="button">No, thanks</button>
					</div>
				</div>
			</template>
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
			notes() {
				return this.$store.state.notes.filter(p => this.search ? Object.values(p).some(v => typeof v == 'string' && v.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) : 1)
			}
		}
	}
</script>
