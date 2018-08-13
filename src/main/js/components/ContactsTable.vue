<template>
<v-app>
<v-toolbar dark color="primary">
<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
<v-toolbar-title>Contacts</v-toolbar-title>
<v-spacer></v-spacer>
<v-dialog v-model="searchDialog" max-width="500px">
<v-btn slot="activator" flat>Search Contacts</v-btn>
<v-card>
  <v-card-title>
    <span class="headline">Search Contacts</span>
  </v-card-title>

  <v-card-text>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm12 md12>
          <v-text-field v-model="contact.firstName" label="First Name"></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-text-field v-model="contact.lastName" label="Last Name"></v-text-field>
        </v-flex>
       </v-layout>
    </v-container>
  </v-card-text>
 
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="closeSearch">Cancel</v-btn>
    <v-btn color="blue darken-1" flat @click="clearSearch">Clear Search</v-btn>
    <v-btn color="blue darken-1" flat @click.native="search">Search</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
<v-dialog v-model="addUpdateDialog" max-width="500px">
  <v-btn slot="activator" flat>Add Contact</v-btn>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field v-model="contact.firstName" label="First Name"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field v-model="contact.lastName" label="Last Name"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field v-model="contact.phoneNumber" label="Phone Number"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field v-model="contact.email" label="Email"></v-text-field>
          </v-flex>
         </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click.native="closeEdit">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</v-toolbar>

<v-data-table
:headers="headers"
:items="contactEntities"
:pagination.sync="pagination"
item-key="items.id"
class="elevation-1"
>
<template slot="items" slot-scope="props">
  <td>{{ props.item.firstName }}</td>
  <td>{{ props.item.lastName }}</td>
  <td>{{ props.item.phoneNumber }}</td>
  <td>{{ props.item.email }}</td>
  <td>
  <v-icon
    small
    class="mr-2"
    @click="selectContactForUpdate(props.item)"
  >
    edit
  </v-icon>
  <v-icon
    small
    @click="deleteContact(props.item.id)"
  >
    delete
  </v-icon>
</td>
</template>
<template slot="no-data">
<v-alert :value="true" color="error" icon="warning">
  No Contacts Loaded
</v-alert>
</template>
</v-data-table>

<v-navigation-drawer
v-model="drawer"
absolute
temporary
>
<v-list class="pa-1">
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <img src="../assets/logo.jpg">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>Sample Navigation</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>

<v-list class="pt-0" dense>
  <v-divider></v-divider>

  <v-list-tile
    v-for="item in items"
    :key="item.title"
    @click=""
  >
    <v-list-tile-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</v-navigation-drawer>

<v-snackbar
v-model="snackbar"
:timeout="timeout"
:top="true"
color="green"
>
{{ successMessage }}
<v-btn
  color="white"
  flat
  @click="snackbar = false"
>
  Close
</v-btn>
</v-snackbar>

</v-app>



</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'contactsTable',
  data() {
	  return {
		  addUpdateDialog: false,
		  searchDialog: false,
		  headers: [
			  {
				  text: 'First Name',
				  sortable: true,
				  value: 'firstName'
			  },
			  {
				  text: 'Last Name',
				  sortable: true,
				  value: 'lastName'
			  },
			  {
				  text: 'Phone Number',
				  sortable: true,
				  value: 'phoneNumber'
			  },
			  {
				  text: 'Email',
				  sortable: true,
				  value: 'email'
			  },
			  {
				  text: 'Actions',
				  sortable: false
			  }
		  ],
		  pagination: {sortBy: 'lastName', descending: false},
		  editedIndex: -1,
	      contact: {
	        firstName: '',
	        lastName: '',
	        phoneNumber: '',
	        email: '',
	        id: null
	      },
	      defaultContact: {
	        firstName: '',
	        lastName: '',
	        phoneNumber: '',
	        email: '',
	        id: null
	      },
	      drawer: null,
		    items: [
		      { title: 'Home', icon: 'dashboard' },
		      { title: 'About', icon: 'question_answer' }
		    ],
		  snackbar: false,
		  timeout: 6000,
		  successMessage: ''
	  }
  },
  computed: {
	  formTitle () {
	      return this.editedIndex === -1 ? 'Add Contact' : 'Update Contact'
	  },
	  contactEntities() {
		  return this.$store.state.contactEntities;
	  }
  },
  methods: {
	  ...mapActions(['deleteContactEntity', 'getContactEntities', 'updateSelectedContact'] ),
	  selectContactForUpdate(contact) {
        this.editedIndex = this.contactEntities.indexOf(contact)
        this.contact = Object.assign({}, contact)
        this.addUpdateDialog = true
	  },
	  save: function() {
		  if(this.editedIndex === -1) {
			  console.log(this.contact);
			  this.$store.dispatch('addContactEntity', this.contact);
			  this.showSuccessAlert('Contact added');
		  } else {
			  console.log(this.contact);
			  this.$store.dispatch('updateContactEntity', this.contact);
			  this.showSuccessAlert('Contact updated');
		  }
		  this.closeEdit();
	  },
	  closeEdit: function() {
		  this.addUpdateDialog = false;
		  this.editedIndex = -1;
		  this.contact = Object.assign({}, this.defaultContact);
	  },
	  deleteContact: function(id) {
		  this.deleteContactEntity(id);
		  this.showSuccessAlert('Contact deleted');
	  },
	  search: function() {
		  this.$store.dispatch('searchContactEntities', this.contact);
		  this.searchDialog = false;
		  this.contact = Object.assign({}, this.defaultContact);
	  },
	  closeSearch: function() {
		  this.searchDialog = false;
		  this.contact = Object.assign({}, this.defaultContact);
	  },
	  clearSearch: function() {
		  this.getContactEntities();
		  this.searchDialog = false;
	  },
	  showSuccessAlert: function(message) {
		  this.successMessage = message;
		  this.snackbar = true;
	  }
  },
  created: function () {
	  this.getContactEntities();
  }

}

</script>

<style>

</style>