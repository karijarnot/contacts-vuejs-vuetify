<template>
<div class="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="addModalLabel">Add Contact</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form @submit.prevent="addContact(contactEntity)">
			<div class="modal-body">
				<div class="form-group">
					<label class="control-label" htmlFor="addFirstName">First Name</label> 
					<input type="text" class="form-control" id="addFirstName" name="firstName" v-model="contactEntity.firstName" required />
				</div>
				<div class="form-group">
					<label class="control-label" htmlFor="addLastName">Last Name</label> 
					<input type="text" class="form-control" id="addLastName" name="lastName" v-model="contactEntity.lastName" required />
				</div>
				<div class="form-group">
					<label class="control-label" htmlFor="addPhoneNumber">Phone Number</label> 
					<input type="text" class="form-control" id="addPhoneNumber" name="phoneNumber" v-model="contactEntity.phoneNumber" />
				</div>
				<div class="form-group">
					<label class="control-label" htmlFor="addEmail">Email</label> 
					<input type="text" class="form-control" id="addEmail" name="email" v-model="contactEntity.email" />
				</div>
			</div>
			<div class="modal-footer">
				<input type="submit" value="Submit" class="btn btn-primary"  /> 
				<input type="reset" value="Reset" class="btn btn-secondary" @click="resetContact()" />
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
			</form>
		</div>
	</div>
</div>
</template>
<script>
import toastr from 'toastr';

export default {
  name: 'addContactModal',
  data () {
    return {
      contactEntity: {
    	firstName: '',
    	lastName: '',
    	phoneNumber: '',
    	email: ''
      }
    }
  },
  methods: {
	  addContact: function(contactEntity) {
		  this.$store.dispatch('addContactEntity', contactEntity);
		  this.resetContact();
		  $('#addModal').modal('hide');
		  toastr.success('Contact added');
	  },
	  resetContact: function() {
		  const resetContactEntity = {
		    firstName: '',
	    	lastName: '',
	    	phoneNumber: '',
	    	email: ''
	      };
	      this.contactEntity = resetContactEntity;
	  }
  }
}
</script>

<style>

</style>
