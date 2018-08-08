<template>
<div class="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="searchModalLabel">Search Contacts</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label class="control-label" for="findFirstName">First Name</label> 
					<input type="text" class="form-control" id="findFirstName" name="firstName" v-model="contactEntity.firstName" />
				</div>
				<div class="form-group">
					<label class="control-label" for="findLastName">Last Name</label> 
					<input type="text" class="form-control" id="findLastName" name="lastName" v-model="contactEntity.lastName" />
				</div>
			</div>
			<div class="modal-footer">
				<input type="submit" value="Submit" class="btn btn-primary" @click="searchContactEntities(contactEntity)" /> 
				<input type="reset" value="Reset" class="btn btn-secondary" @click="resetContact()" />
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
  name: 'searchContactModal',
  data () {
    return {
      contactEntity: {
    	firstName: '',
    	lastName: ''
      }
    }
  },
  methods: {
	  searchContactEntities: function(contactEntity) {
		  this.$store.dispatch('searchContactEntities', contactEntity);
		  $('#searchModal').modal('hide');
	  },
	  resetContact: function() {
		  const resetContactEntity = {
		    firstName: '',
	    	lastName: ''
	      };
	      this.contactEntity = resetContactEntity;
	  }
  }
}
</script>

<style>

</style>


