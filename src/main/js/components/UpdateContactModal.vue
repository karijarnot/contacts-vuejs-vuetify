<template>

<div class="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="updateModalLabel">Update Contact</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form @submit.prevent="updateContact(selectedContact)">
			<div class="modal-body">
				<div class="form-group">
					<label class="control-label" for="updateFirstName">First Name</label> 
					<input type="text" class="form-control" id="updateFirstName" name="firstName" v-model="selectedContact.firstName" required />
				</div>
				<div class="form-group">
					<label class="control-label" for="updateLastName">Last Name</label> 
					<input type="text" class="form-control" id="updateLastName" name="lastName" v-model="selectedContact.lastName" required />
				</div>
				<div class="form-group">
					<label class="control-label" for="updatePhoneNumber">Phone Number</label> 
					<input type="text" class="form-control" id="updatePhoneNumber" name="phoneNumber" v-model="selectedContact.phoneNumber"  />
				</div>
				<div class="form-group">
					<label class="control-label" for="updateEmail">Email</label> 
					<input type="text" class="form-control" id="updateEmail" name="email" v-model="selectedContact.email" />
				</div>
			</div>
			<div class="modal-footer">
				<input type="submit" value="Submit" class="btn btn-primary" /> 
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
  name: 'updateContactModal',
  computed: {
	 selectedContact() {
		 return this.$store.state.selectedContact;
	 }
  },
  methods: {
	  updateContact: function(contactEntity) {
		  this.$store.dispatch('updateContactEntity', contactEntity);
		  $('#updateModal').modal('hide');
		  toastr.success('Contact updated');
	  },
	  resetContact: function() {
		  //???
	  }
  }
}
</script>

<style>

</style>