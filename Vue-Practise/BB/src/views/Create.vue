<template>
    <div class="create-page">
      <app-header></app-header>
       <div class="create-form">
           <form action="" >
               <div class="form">
                    <div class="form-input name">
                        <label for="name">Equipment Name</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" placeholder="Enter Equipment Name" id="name" v-model="equipment.equipmentName" :class="{'error-message': errors[0]}">
                            <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="form-input">
                        <label for="quantity">Quantity</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="number" id="quantity" placeholder="Enter Quantity" v-model="equipment.equipmentQuantity" :class="{'error-message': errors[0]}">
                            <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="form-input">
                        <label for="quantity">Type</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <select name="types" class="select-input" v-model="equipment.equipmentTypeName" :class="{'error-message': errors[0]}">
                                <option v-for="(type, i) in types" :key="i" :selected="type.selected">{{type.name}}</option>
                            </select>
                        <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
               </div>
               <div class="submit-btn">
                 <v-app id="inspire">
                    <v-btn
                      @click.prevent="postEquipment()"
                      class="ma-2"
                      :loading="isLoading"
                      :disabled="isLoading || !isComplete"
                      color="success"
                    >
                      Submit
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                </v-app>
               </div>
               <!-- <button class="submit" :disabled='!isComplete'>Submit</button> -->
           </form>
        <!-- <div class="loading" v-if="isLoading">Loading&#8230;</div> -->
       </div>
    </div>
</template>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.alert-toast {
  width: 20rem;
  float: right;
}

.error-message {
    background-color: #fdc8c8;
}
.error-text {
    color: #b00000;
    font-size: 1rem;
    position: absolute;
    left: 0;
    bottom: 0;
}
.create-page {
    & .create-form {
        font-size: 1.1rem;
        width: 70vw;
        margin: 5rem auto;
        & .form {
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 45% 45%;
            grid-column-gap: 10%;
            & .form-input {
                display: grid;
                flex-basis: 48%;
                margin: 1rem 0;
                position: relative;
                padding-bottom: .5rem;
                & label {
                    margin: .5rem 0;
                }
                & input, select {
                    height: 3rem;
                    padding: 0 2rem;
                    border-radius: .5rem;
                    border: grey .1rem solid;
                    width: 100%;
                    margin-bottom: 1rem;
                }
                & select {
                 -webkit-appearance: checkbox;
                }
            }
            & .name {
                grid-column: 1/ span 2;
            }
        }
        & .submit-btn {
          display: grid;
          justify-content: center;
        }
    }
}
</style>

<script>
import { equipmentEventBus } from '../eventBus/equipment'
import { eventBus } from './../main'
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
  },
  created () {
    if (this.$route.params.id) {
      this.isLoading = true
      equipmentEventBus.getEquipment(this.$route.params.id)
        .then(response => response.json())
        .then(json => {
          this.equipment.equipmentName = json.name
          this.equipment.equipmentQuantity = json.quantity
          this.equipment.equipmentType = json.type
          this.equipment.equipmentTypeName = this.equipment.equipmentType === 0 ? 'Indoor' : 'Outdoor'
          this.equipment.equipmentStatus = json.status
          this.equipment.equipmentStatusName = json.statusName
          this.isLoading = false
        })
        .catch(err => {
          if (err.types === 404) {
            this.isLoading = false
          }
        })
    }
  },
  methods: {
    postEquipment () {
      this.isLoading = true
      this.equipment.equipmentTypeName === 'Indoor' ? this.equipment.equipmentType = 0 : this.equipment.equipmentType = 1
      console.log(this.equipment)
      let payload = []
      if (this.$route.params.id) {
        payload = {
          id: this.$route.params.id,
          name: this.equipment.equipmentName,
          status: 0,
          statusName: 'Created',
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        }
        equipmentEventBus.editEquipment(this.$route.params.id, payload)
          .then(res => {
            eventBus.$emit('alert', 'succesful')
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            eventBus.$emit('alert', err)
            this.isLoading = true
          })
      } else {
        payload = {
          name: this.equipment.equipmentName,
          status: 0,
          statusName: 'Created',
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        }
        equipmentEventBus.createEquipment(payload)
          .then(res => {
            eventBus.$emit('alert', 'succesful')
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            eventBus.$emit('alert', err)
            this.isLoading = true
          })
      }
    }
  },
  computed: {
    isComplete () {
      let res = false
      if (this.equipment.equipmentName && this.equipment.equipmentTypeName && this.equipment.equipmentQuantity) {
        res = true
      }
      return res
    }
  }
}

</script>
