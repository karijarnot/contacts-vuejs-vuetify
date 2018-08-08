<template>
<v-client-table :data="contactEntities" :columns="columns" :options="options"></v-client-table>
</template>
<script>


export default {
  name: 'contactsTable',
  data() {
	  return {
    columns: [
    	'firstName',
    	'lastName',
    	'phoneNumber',
    	'email'
    ],
    options: {
    	headings: {
    		firstName: 'First Name',
    		lastName: 'Last Name',
    		phoneNumber: 'Phone Number',
    		email: 'Email'
    	},
    	sortable: [
    		'firstName',
	    	'lastName',
	    	'phoneNumber',
	    	'email'
	    ],
    	filterable: ['firstName', 'lastName']
    }
	  }
  },
  computed: {
	  contactEntities() {
		  return this.$store.state.contactEntities;
	  }
  }

}

</script>

<style>

</style>