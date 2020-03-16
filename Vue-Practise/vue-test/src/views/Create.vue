<template>
    <div>
        <app-header></app-header>
         <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label for="">Equipment Name</label>
                        <input
                                type="text"
                                id="email"
                                class="form-control"
                                :value="equipment.equipmentName"
                                @input="equipment.equipmentName = $event.target.value">
                    </div>
                    <div class="form-group">
                        <label for="password">Equipment Quantity</label>
                        <input
                                type="text"
                                id="equipQty"
                                class="form-control"
                                 v-model.lazy="equipment.equipmentQuantity">
                           
                    </div>
                    <div class="form-group">
                        <label for="age">Equipment Status</label>
                        <input
                                type="number"
                                id="age"
                                class="form-control"
                                 v-model="equipment.equipmentStatus">
                    </div>

                </div>
            </div>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button
                            class="btn btn-primary" @click.prevent="submitted">Submit!
                    </button>
                </div>
        </form>
    </div>
    </div>
   
</template>

<script>
export default {
     data () {
    return {
      equipment: {
        equipmentName: null,
        equipmentQuantity: null,
        equipmentType: null,
        equipmentTypeName: null,
        equipmentStatus: null,
        equipmentStatusName: null,
        equipmentTypeId: null
      },
      types: [
        {
          name: 'Indoor',
          value: 0
        },
        {
          name: 'Outdoor',
          value: 1
        }
      ],
      isLoading: false
    }
  }
}
</script>