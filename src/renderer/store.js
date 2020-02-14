import Vue from 'vue'
import Vuex from 'vuex'
import mysql from 'mysql'
import sa from 'sweetalert'
import router from './router'

Vue.use(Vuex)

const db = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'tkrs9qZdK0',
	password: 'kuRj1f8xbO',
	database: 'tkrs9qZdK0'
})

db.connect(function(err) {
    if (err) {
    	throw err
    }
    console.log('connected!')
})

var handleError = (err, reject) => {
	// sa(err.sqlMessage, err.code, 'error')
	console.log([err])
	reject(err)
}

var query = q => new Promise((resolve, reject) => {
	db.query(q, (err, res) => {
		console.log(err, res)

		if (err) {
			// sa(err.sqlMessage, err.code, 'error')
			console.log([err])
			reject(err)
		}
		else {
			resolve(res)
		}
	})
})

var Store = new Vuex.Store({
	state: {
		loading: false,
		players: [],
		fees: [],
		debits: [],
		invoices: [],
		expenses: []
	},
	getters: {

	},
	mutations: {
		LOADING(state, payload) {
			state.loading = payload
		},
		SET_PLAYERS(state, payload) {
			state.players = payload
		},
		SET_FEES(state, payload) {
			state.fees = payload
		},
		SET_DEBITS(state, payload) {
			state.debits = payload
		},
		SET_INVOICES(state, payload) {
			state.invoices = payload
		},
		SET_EXPENSES(state, payload) {
			state.expenses = payload
		}
	},
	actions: {
		UPDATE_RATE_PLAYER({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				query(mysql.format('UPDATE rates SET ? WHERE id = ?', [data, id])).then(resolve).catch(reject)
			})
		},
		UPDATE_SUBSCRIPTION_PLAYER({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE subscriptions SET ? WHERE id = ?', [data, id], (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						resolve(res)
					}
				})
			})
		},
		UPDATE_MEMBERSHIP_PLAYER({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE memberships SET ? WHERE id = ?', [data, id], (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						resolve(res)
					}
				})
			})
		},
		UPDATE_SIGNING_PLAYER({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE signings SET ? WHERE id = ?', [data, id], (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						resolve(res)
					}
				})
			})
		},
		UP_RATE_PLAYER({ state, commit }, data) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO rates SET ?', data, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						db.query('SELECT * FROM rates WHERE player_id = ?', data.player_id, (err, rates) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								commit('SET_PLAYERS', state.players.map(p => p.id == data.player_id ? { ...p, rates } : p))
							}
						})
						resolve(res)
					}
				})
			})
		},
		UP_SUBSCRIPTION_PLAYER({ state, commit }, data) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO subscriptions SET ?', data, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						db.query('UPDATE subscriptions SET date_down=NOW() WHERE player_id = ' + data.player_id + ' AND id != ' + res.insertId, err => {
							if (err) {
								handleError(err, reject)
							}
						})

						db.query('SELECT * FROM subscriptions WHERE player_id = ?', data.player_id, (err, subscriptions) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								commit('SET_PLAYERS', state.players.map(p => p.id == data.player_id ? { ...p, subscriptions } : p))
							}
						})
						resolve(res)
					}
				})
			})
		},
		UP_MEMBERSHIP_PLAYER({ state, commit }, data) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO memberships SET ?', data, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						db.query('UPDATE memberships SET date_down=NOW() WHERE player_id = ' + data.player_id + ' AND id != ' + res.insertId, err => {
							if (err) {
								handleError(err, reject)
							}
						})

						db.query('SELECT * FROM memberships WHERE player_id = ?', data.player_id, (err, memberships) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								commit('SET_PLAYERS', state.players.map(p => p.id == data.player_id ? { ...p, memberships } : p))
							}
						})
						resolve(res)
					}
				})
			})
		},
		UP_SIGNING_PLAYER({ state, commit }, data) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO signings SET ?', data, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						db.query('UPDATE signings SET date_down=NOW() WHERE player_id = ' + data.player_id + ' AND id != ' + res.insertId, err => {
							if (err) {
								handleError(err, reject)
							}
						})

						db.query('SELECT * FROM signings WHERE player_id = ?', data.player_id, (err, signings) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								commit('SET_PLAYERS', state.players.map(p => p.id == data.player_id ? { ...p, signings } : p))
							}
						})
						resolve(res)
					}
				})
			})
		},
		GET_PLAYER_DATA({ commit }, id) {
			commit('LOADING', true)
			return new Promise((resolve, reject) => {
				db.query('SELECT * FROM players WHERE id = ? LIMIT 1', id, (err, [player]) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						db.query('SELECT * FROM fees WHERE id = ? OR (sport = ? AND year = ?) OR (sport = ? AND categ = "PS") LIMIT 1', [player.fee_id, player.sport, player.year, player.sport], (err, [fee]) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								player.fee = fee
							}
						})

						db.query('SELECT * FROM memberships WHERE player_id = ?', id, (err, memberships) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								player.memberships = memberships
							}
						})

						db.query('SELECT * FROM subscriptions WHERE player_id = ?', id, (err, subscriptions) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								player.subscriptions = subscriptions
							}
						})

						db.query('SELECT * FROM signings WHERE player_id = ?', id, (err, signings) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								player.signings = signings
							}
						})

						db.query('SELECT * FROM rates WHERE player_id = ?', id, (err, rates) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								commit('LOADING', false)
								resolve({ ...player, rates })
							}
						})
					}
				})
			})
		},
		SELECT_PLAYERS({ commit }) {
			return new Promise((resolve, reject) => {
				db.query('SELECT * FROM players', (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						commit('SET_PLAYERS', res)
						resolve(res)
					}
				})
			})
		},
		CREATE_PLAYER({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO players SET ?', { ...payload, year: payload.born_date.getFullYear() }, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						sa('Guardado con exito', 'Guardado en la tabla jugadores', 'success')
						dispatch('SELECT_PLAYERS')
						resolve(res)
					}
				})
			})
		},
		UPDATE_PLAYER({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE players SET ? WHERE id = ?', [data, id], (err, signings) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						sa('Guardado con exito', 'Se actualizo el registro en la tabla jugadores', 'success')
						commit('SET_PLAYERS', state.players.map(p => p.id == id ? { ...p, signings } : p))
					}
				})
			})
		},
		SELECT_FEES({ commit }) {
			return new Promise((resolve, reject) => {
				db.query('SELECT * FROM fees', (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						commit('SET_FEES', res)
						resolve(res)
					}
				})
			})
		},
		UPDATE_FEE({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE fees SET ? WHERE id = ?', [data, id], (err, signings) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						// dispatch('SELECT_FEES')
						commit('SET_FEES', JSON.parse(JSON.stringify(state.fees)).map(f => f.id == id ? { ...f, signings } : f))
						resolve()
					}
				})
			})
		},
		SELECT_DEBITS({ commit }) {
			return new Promise((resolve, reject) => {
				db.query('SELECT * FROM debits', (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						commit('SET_DEBITS', res)
						resolve(res)
					}
				})
			})
		},
		SELECT_INVOICES({ commit }) {
			return new Promise((resolve, reject) => {
				query('SELECT * FROM invoices WHERE deleted_at IS NULL')
				.then(invoices => {
					query('SELECT * FROM invoices_dues WHERE deleted_at IS NULL')
					.then(dues => {
						var res = invoices.map(i => ({ ...i, dues: dues.filter(d => d.invoice_id == i.id) }))
						commit('SET_INVOICES', res)
						resolve(res)
					})
					.catch(reject)
				})
				.catch(reject)
			})
		},
		CREATE_INVOICE({ dispatch }, { date, ref, subject, amount, notes, dues }) {
			return new Promise((resolve, reject) => {
				db.beginTransaction(function(err) {
					if (err) {
						handleError(err, reject)
					}
					db.query('INSERT INTO invoices SET ?', { date, ref, subject, amount, notes }, (err, res) => {
						if (err) {
							return db.rollback(() => handleError(err, reject))
						}

						dues.forEach(due => {
							db.query('INSERT INTO invoices_dues SET ?', { ...due, invoice_id: res.insertId }, err => {
								if (err) {
									return db.rollback(() => handleError(err, reject))
								}

								db.commit(err => {
									if (err) {
										return db.rollback(() => handleError(err, reject))
									}
									else {
										sa('Guardado con exito', 'Guardado en la tabla entradas', 'success')
										dispatch('SELECT_INVOICES')
										resolve(res)
									}
								})
							})
						})
					})
				})
			})
		},
		UPDATE_INVOICE({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE invoices SET ? WHERE id = ?', [data, id], (err, signings) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						sa('Guardado con exito', 'Se actualizo el registro en la tabla entradas', 'success')
						commit('SET_INVOICES', state.players.map(p => p.id == id ? { ...p, signings } : p))
						resolve(signings)
					}
				})
			})
		},
		DELETE_INVOICE({ dispatch }, id) {
			return new Promise((resolve, reject) => {
				sa({ title: 'Seguro desea eliminar el registro?', icon: 'warning', buttons: true, dangerMode: true })
				.then(yes => {
					if (yes) {
						db.beginTransaction(err => {
							if (err) {
								handleError(err, reject)
							}
							db.query('UPDATE invoices SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', id, (err, res) => {
								if (err) {
									handleError(err, reject)
								}
								else {
									db.query('UPDATE invoices_dues SET deleted_at = CURRENT_TIMESTAMP() WHERE invoice_id = ?', id, (err, res) => {
										if (err) {
											handleError(err, reject)
										}
										else {
											sa('Se elimino el registro.', 'Eliminado de la tabla entradas', 'success')
											dispatch('SELECT_INVOICES')
											resolve(res)
										}
									})
								}
							})
						})
					}
				})
			})
		},
		SELECT_EXPENSES({ commit }, payload) {
			return new Promise((resolve, reject) => {
				db.query('SELECT * FROM expenses WHERE deleted_at IS NULL', (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						commit('SET_EXPENSES', res)
						resolve(res)
					}
				})
			})
		},
		CREATE_EXPENSE({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				db.query('INSERT INTO expenses SET ?', payload, (err, res) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						sa('Guardado con exito', 'Guardado en la tabla entradas', 'success')
						dispatch('SELECT_EXPENSES')
						resolve(res)
					}
				})
			})
		},
		UPDATE_EXPENSE({ state, commit }, { id, data }) {
			return new Promise((resolve, reject) => {
				db.query('UPDATE expenses SET ? WHERE id = ?', [data, id], (err, expenses) => {
					if (err) {
						handleError(err, reject)
					}
					else {
						sa('Guardado con exito', 'Se actualizo el registro en la tabla salidas', 'success')
						commit('SET_EXPENSES', state.players.map(p => p.id == id ? { ...p, expenses } : p))
						resolve(expenses)
					}
				})
			})
		},
		DELETE_EXPENSE({ dispatch }, id) {
			return new Promise((resolve, reject) => {
				sa({ title: 'Seguro desea eliminar el registro?', icon: 'warning', buttons: true, dangerMode: true })
				.then(willDelete => {
					if (willDelete) {
						db.query('UPDATE expenses SET deleted_at=CURRENT_TIMESTAMP() WHERE id =?', id, (err, res) => {
							if (err) {
								handleError(err, reject)
							}
							else {
								sa('Se elimino el registro.', 'Eliminado de la tabla salidas', 'success')
								dispatch('SELECT_EXPENSES')
								resolve(res)
							}
						})
					}
				})
			})
		},
		PAY_INVOICE_DUE({ state, dispatch }, { id, invoice_id }) {
			return new Promise((resolve, reject) => {
				db.beginTransaction(err => {
					if (err) {
						handleError(err, reject)
					}
					db.query('CALL PAY_INVOICE_DUE(?, ?)', [id, invoice_id], err => {
						if (err) {
							db.rollback(() => handleError(err, reject))
						}
						else {
							db.commit(err => {
								if (err) {
									db.rollback(() => handleError(err, reject))
								}
								else {
									sa('Guardado con exito', 'Se actualizo el registro en la tabla entradas', 'success')
									dispatch('SELECT_INVOICES')
									resolve()
								}
							})
						}
					})
				})
			})
		},
		UNPAY_INVOICE_DUE({ state, dispatch }, { id, invoice_id }) {
			return new Promise((resolve, reject) => {
				db.beginTransaction(err => {
					if (err) {
						handleError(err, reject)
					}
					db.query('CALL UNPAY_INVOICE_DUE(?, ?)', [id, invoice_id], err => {
						if (err) {
							db.rollback(() => handleError(err, reject))
						}
						else {
							db.commit(err => {
								if (err) {
									db.rollback(() => handleError(err, reject))
								}
								else {
									sa('Guardado con exito', 'Se actualizo el registro en la tabla entradas', 'success')
									dispatch('SELECT_INVOICES')
									resolve()
								}
							})
						}
					})
				})
			})
		}
	},
	strict: process.env.NODE_ENV !== 'production'
})

export default Store
