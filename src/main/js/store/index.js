import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		contactEntities: [],
		selectedContact: {}
	},
	mutations: {
		updateContactEntities(state, contactEntities) {
			state.contactEntities = contactEntities;
		},
		updateSelectedContact(state, selectedContact) {
			state.selectedContact = selectedContact;
		}
	},
	actions: {
		getContactEntities({commit}) {
			axios.get('/contacts-rest/').then(response => {
				const contactEntities = response.data;
				commit('updateContactEntities', contactEntities);
			}).catch(error => {
				throw(error);
			});
		},
		addContactEntity({dispatch}, contactEntity) {
			axios.post('/contacts-rest/add', contactEntity).then(response =>{
				const contactEntityWithId = response.data;
				dispatch('getContactEntities');
			}).catch(error => {
				throw(error);
			});
		},
		deleteContactEntity({dispatch}, id) {
			axios.delete('/contacts-rest/' + id).then(res => {
				dispatch('getContactEntities');
			}).catch(error => {
				throw(error);
			});
		},
		searchContactEntities({commit}, contactEntity) {
			axios.post('/contacts-rest/search', contactEntity).then(res => {
				const contactEntities = res.data;
				commit('updateContactEntities', contactEntities);
			}).catch(error => {
				throw(error);
			});
		},
		updateContactEntity({dispatch, commit}, contactEntity) {
			axios.put('/contacts-rest/update', contactEntity).then(response => {
				dispatch('getContactEntities');
				commit('updateSelectedContact', {});
			}).catch(error => {
				throw(error);
			});
		}
	}
});