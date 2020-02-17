<template>
	<div>
		<div class="row">
			<div class="col-md-4">
				<div class="">
					<h2>
						<span>{{player.lastname}}, {{player.name}}</span>
					</h2>
					<button class="btn btn-sm btn-primary" @click.prevent="$router.push({name: 'PlayerEdit', params: {id: player.id }})">Editar</button>
					<div class="d-flex justify-content-between align-items-center mb-3">
						<span class="text-muted">{{player.email}}</span>
					</div>
					<dl>
						<dt>{{player.doc_type}}</dt>
						<dd>{{player.doc_num}}</dd>
						<template v-if="player.born_date">
							<dt>Nacimiento</dt>
							<dd>{{player.born_date.toLocaleDateString()}}</dd>
						</template>
						<dt>Telefonos</dt>
						<dd>{{[player.tel_1, player.tel_2].filter(x => x).join(', ')}}</dd>
						<dt>Dirección</dt>
						<dd>{{player.address}} <b class="text-muted">{{player.city}}</b></dd>
						<dt>Obra Social</dt>
						<dd>{{player.os_name}} <b class="text-muted d-block">{{player.os_num}}</b></dd>
					</dl>
					<div class="alert mb-2 alert-success" v-if="player.authorized">
						<h6 class="alert-heading">Autorizado a jugar en una categoria superior.</h6>
						<dl class="row mb-0">
							<dt class="col">Desde:</dt>
							<dd class="col text-right">{{player.authorized.toLocaleDateString()}}</dd>
						</dl>
					</div>
					<div class="mt-4">
						<h5 class="d-flex justify-content-between align-items-center text-muted">
							<span>Notas</span>
							<a class="fe fe-plus-circle" @click.prevent="$router.push({name: 'newPlayerNote', params: {id: player.id }})">&nbsp;</a>
						</h5>
						<div v-for="(item, k) in player.notes" :class="'mb-1 alert alert-' + item.type" :key="k"><strong>{{new Date(item.date).toLocaleDateString()}}</strong>: {{item.note}}</div>
					</div>
					<div class="card mb-2" v-if="player.courses">
						<div class="card-body">
							<h5 class="card-title">Cursos</h5>
							<p class="card-text">{{player.courses}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="card mb-2">
					<div class="card-header">
						<h3 class="card-title">Tarifario</h3>
						<div class="card-options">
							<a href="#" class="card-options-remove" @click.prevent="$router.push({name: 'NewRateForm', params: { id: player.id }})">
								<i class="fe fe-plus-circle"></i>
							</a>
						</div>
					</div>
					<div class="text-nowrap table-responsive">
						<table class="card-table table table-sm table-borderless m-0">
							<thead>
								<tr>
									<th>Fecha</th>
									<th>Fecha de baja</th>
									<th>Titulo</th>
									<th class="text-left">Valor</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="item in player.rates">
									<tr class="border-top">
										<td>{{item.date_up.toLocaleDateString()}}</td>
										<td>
											<template v-if="item.date_down">{{item.date_down ? item.date_down.toLocaleDateString() : null}}</template>
										</td>
										<td>{{item.name}}</td>
										<td class="text-left">$ {{item.value}} </td>
										<td class="text-right"><button type="button" class="btn btn-secondary btn-sm" @click.prevent="$router.push({name: 'EditRateForm', params: { id: player.id, rate: item.id }})">Editar</button></td>
									</tr>
								</template>
								<tr class="border-top" v-if="player.fee">
									<td colspan="2">Cuota</td>
									<td>{{player.fee.sport}} {{player.fee.categ}}</td>
									<td class="text-left"><strong>$ {{player.fee.value}}</strong></td>
									<td>&nbsp;</td>
								</tr>
								<tr class="border-top" v-if="player.fee">
									<td colspan="3">Total</td>
									<td class="text-left"><strong>$ {{(player.rates||[]).reduce((a,b) => a + parseInt(b.value), player.fee ? player.fee.value : 0)}}</strong></td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
							<thead>
								<tr>
									<th colspan="5">Items inactivos</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="item in player.rates">
									<tr class="border-top">
										<td>{{item.date_up.toLocaleDateString()}}</td>
										<td>
											<template v-if="item.date_down">{{item.date_down ? item.date_down.toLocaleDateString() : null}}</template>
										</td>
										<td>{{item.name}}</td>
										<td class="text-left">$ {{item.value}} </td>
										<td class="text-right"><button type="button" class="btn btn-secondary btn-sm" @click.prevent="$router.push({name: 'EditRateForm', params: { id: player.id, rate: item.id }})">Editar</button></td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card mb-2">
					<div class="card-header">
						<h3 class="card-title">Subscripciones</h3>
						<div class="card-options">
							<a href="#" class="card-options-remove" @click.prevent="$router.push({name: 'UpSubscriptionForm', params: { id: player.id }})">
								<i class="fe fe-plus-circle"></i>
							</a>
						</div>
					</div>
					<div class="card-body">
						<p class="card-text">Listado de susbcripciones a debito automatico.</p>
					</div>
					<div class="text-nowrap table-responsive">
						<table class="card-table table table-sm table-borderless m-0">
							<thead>
								<tr>
									<th>Fecha de alta</th>
									<th>Metodo de pago</th>
									<th class="text-right">Fecha de baja</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="item in player.subscriptions">
									<tr class="border-top">
										<td>{{item.date_up.toLocaleDateString()}}</td>
										<td>{{item.method}}</td>
										<td class="text-right align-middle">
											<template v-if="item.date_down">{{item.date_down ? item.date_down.toLocaleDateString() : null}}</template>
											<button v-else type="button" class="btn btn-secondary btn-sm" @click.prevent="$router.push({name: 'DownSubscriptionForm', params: { id: player.id, subscription: item.id }})">Editar</button>
										</td>
									</tr>
									<tr v-if="item.notes">
										<td colspan="3">
											<span class="text-wrap"><strong>Observación:</strong> {{item.notes}}</span>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card mb-2">
					<div class="card-body">
						<h5 class="card-title">Fichajes</h5>
						<p class="card-text">Listado de fichajes.</p>
						<a href="#" class="btn btn-sm btn-primary" @click.prevent="$router.push({name: 'NewSigningForm', params: { id: player.id }})">Nuevo Fichaje</a>
						<div class="text-nowrap table-responsive">
							<table class="table table-sm table-borderless m-0">
								<thead>
									<tr>
										<th>Fecha de alta</th>
										<th class="text-right">Fecha de baja</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="item in player.signings">
										<tr class="border-top">
											<td>{{item.date_up.toLocaleDateString()}}</td>
											<td class="text-right align-middle">
												<template v-if="item.date_down">{{item.date_down ? item.date_down.toLocaleDateString() : null}}</template>
												<button v-else type="button" class="btn btn-secondary btn-sm" @click.prevent="$router.push({name: 'DownSigningForm', params: { id: player.id, signing: item.id }})">Editar</button>
											</td>
										</tr>
										<tr v-if="item.notes">
											<td colspan="2">
												<span class="text-wrap"><strong>Observación:</strong> {{item.notes}}</span>
											</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Membresias</h5>
						<p class="card-text">Veces y maneras de la que se asocio al club.</p>
						<a href="#" class="btn btn-sm btn-primary" @click.prevent="$router.push({name: 'UpMembershipForm', params: { id: player.id }})">Nueva Membresia</a>
						<div class="text-nowrap table-responsive">
							<table class="table table-sm table-borderless m-0">
								<thead>
									<tr>
										<th>Fecha de alta</th>
										<th>Tipo</th>
										<th class="text-right">Fecha de baja</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="item in player.memberships">
										<tr class="border-top">
											<td>{{item.date_up.toLocaleDateString()}}</td>
											<td>{{item.type}}</td>
											<td class="text-right align-middle">
												<template v-if="item.date_down">{{item.date_down ? item.date_down.toLocaleDateString() : null}}</template>
												<button v-else type="button" class="btn btn-secondary btn-sm" @click.prevent="$router.push({name: 'DownMembershipForm', params: { id: player.id, membership: item.id }})">Editar</button>
											</td>
										</tr>
										<tr v-if="item.notes">
											<td colspan="3">
												<span class="text-wrap"><strong>Observación:</strong> {{item.notes}}</span>
											</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	var theMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	export default {
		computed: {
			player() {
				var player = this.$store.state.players.find(p => p.id == this.$route.params.id)
				var fee = this.$store.state.fees.find(p => p.player_id == this.$route.params.id)
				var memberships = this.$store.state.memberships.filter(p => p.player_id == this.$route.params.id)
				var subscriptions = this.$store.state.subscriptions.filter(p => p.player_id == this.$route.params.id)
				var signings = this.$store.state.signings.filter(p => p.player_id == this.$route.params.id)
				console.log(player)
				return {
					...player,
					fee,
					memberships,
					subscriptions,
					signings,
					notes: player.notes ? JSON.parse(player.notes).filter(x => x) : null
				}
			}
		}
	}
</script>
