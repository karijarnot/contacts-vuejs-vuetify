<template>
  <div id="app" class="container-fluid">
    <h1>{{ msg }}</h1>
    <table class="table table-striped">
    	<thead>
    		<tr>
    			<th>First Name</th>
    			<th>Last Name</th>
    			<th>Phone Number</th>
    			<th>Email</th>
    			<th></th>
    			<th></th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="contact in contactEntities" :key="contact.id" >
    			<td>{{contact.firstName}}</td>
    			<td>{{contact.lastName}}</td>
    			<td>{{contact.phoneNumber}}</td>
    			<td>{{contact.email}}</td>
    			<td><button class="btn btn-primary btn-sm" @click="selectContactForUpdate(contact)">Update</button></td>
    			<td><button class="btn btn-danger btn-sm" @click="deleteContact(contact.id)">Delete</button></td>
     		</tr>
     	</tbody>
     </table>
     <div class="text-center">
		<button type="button" class="btn btn-primary m-1" data-toggle="modal" data-target="#addModal">Add Contact</button>
		<button type="button" class="btn btn-primary m-1" data-toggle="modal" data-target="#searchModal">Search Contacts</button>
		<button type="button" class="btn btn-primary m-1" @click="clearSearch()">Display All Contacts</button>
	</div>
	<AddContactModal />
	<SearchContactsModal />
	<UpdateContactModal />
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import AddContactModal from './components/AddContactModal.vue';
import SearchContactsModal from './components/SearchContactsModal.vue';
import UpdateContactModal from './components/UpdateContactModal.vue';
import toastr from 'toastr';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Contacts'
    }
  },
  components: {
	  AddContactModal,
	  SearchContactsModal,
	  UpdateContactModal
  },
  computed: {
	  contactEntities() {
		  return this.$store.state.contactEntities;
	  }
  },
  methods: {
	  ...mapActions(['deleteContactEntity', 'getContactEntities', 'updateSelectedContact'] ),
	  deleteContact: function(id) {
		  this.deleteContactEntity(id);
		  toastr.success('Contact deleted');
	  },
	  clearSearch: function() {
		  this.$store.dispatch('getContactEntities');
	  },
	  selectContactForUpdate: function(contactEntity) {
		  this.$store.commit('updateSelectedContact', Object.assign({}, contactEntity));
		  $("#updateModal").modal('show');
	  }
  },
  created: function () {
	  this.$store.dispatch('getContactEntities');
  }
}
</script>

<style>

</style>
