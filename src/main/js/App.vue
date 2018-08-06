<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <table class="table table-striped">
    	<thead>
    		<tr>
    			<th>First Name</th>
    			<th>Last Name</th>
    			<th>Phone Number</th>
    			<th>Email</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="contact in contactEntities">
    			<td>{{contact.firstName}}</td>
    			<td>{{contact.lastName}}</td>
    			<td>{{contact.phoneNumber}}</td>
    			<td>{{contact.email}}</td>
     		</tr>
     	</tbody>
     </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Contacts',
      contactEntities: null
    }
  },
  created: function () {
	  	axios.get('/contacts-rest/').then(response => {
			const contactEntities = response.data;
			console.log(contactEntities);
			this.contactEntities = contactEntities;
		}).catch(error => {
			throw(error);
		});
  }
}
</script>

<style>

</style>
