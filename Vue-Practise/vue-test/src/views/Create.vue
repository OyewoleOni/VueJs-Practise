<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <form>
        <div class="input-group mb-5 mt-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Equipment Name</span>
          </div>
          <validation-provider
            rules="required"
            v-slot="{ errors }"
            style="width: 80%"
          >
            <input
              type="text"
              id="email"
              placeholder="Enter the equipment name"
              class="form-control"
              :value="equipment.equipmentName"
              @input="equipment.equipmentName = $event.target.value"
              :class="{ 'error-message': errors[0] }"
            />
            <span style="position: absolute" class="error-text">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>

        <div class="input-group mb-5 mt-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Equipment Quantity</span>
          </div>
          <validation-provider
            rules="required"
            v-slot="{ errors }"
            style="width: 80%"
          >
            <input
              type="number"
              id="equipQty"
              placeholder="Enter the quantity"
              class="form-control"
              v-model.lazy="equipment.equipmentQuantity"
            />
            <span style="position: absolute" class="error-text">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>
        <div class="input-group mb-5 mt-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Equipment Type</span>
          </div>
          <validation-provider
            rules="required"
            v-slot="{ errors }"
            style="width: 50%"
          >
            <select
              name="types"
              class="form-control"
              v-model="equipment.equipmentTypeName"
              :class="{ 'error-message': errors[0] }"
            >
              <option
                v-for="(type, i) in types"
                :key="i"
                :selected="type.selected"
                >{{ type.name }}</option
              >
            </select>
            <span style="position: absolute" class="error-text">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>
        <div class="form-group"></div>

        <div
          class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
        >
          <button class="btn btn-primary" @click.prevent="postEquipment()">
            Submit!
          </button>
          <button class="btn btn-danger ml-2" @click="cancel">Cancel!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { equipmentEventBus } from "../services/equipment";
import { eventBus } from "./../main";
export default {
  data() {
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
      res: "",
      types: [
        {
          name: "Indoor",
          value: 0
        },
        {
          name: "Outdoor",
          value: 1
        }
      ],
      isLoading: false
    };
  },
  created() {
    if (this.$route.params.id) {
      // this.isLoading = true
      equipmentEventBus
        .getEquipment(this.$route.params.id)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.equipment.equipmentName = json.name;
          this.equipment.equipmentQuantity = json.quantity;
          this.equipment.equipmentType = json.type;
          this.equipment.equipmentTypeName =
            this.equipment.equipmentType === 0 ? "Indoor" : "Outdoor";
          this.equipment.equipmentStatus = json.status;
          this.equipment.equipmentStatusName = json.statusName;
          this.isLoading = false;
        })
        .catch(err => {
          if (err.types === 404) {
            this.isLoading = false;
          }
        });
    }
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    postEquipment() {
      this.isLoading = true;
      this.equipment.equipmentTypeName === "Indoor"
        ? (this.equipment.equipmentType = 0)
        : (this.equipment.equipmentType = 1);
      console.log(this.equipment);
      let payload = [];
      if (this.$route.params.id) {
        payload = {
          id: this.$route.params.id,
          name: this.equipment.equipmentName,
          status: 0,
          statusName: "Created",
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        };
        equipmentEventBus
          .editEquipment(this.$route.params.id, payload)
          .then(res => {
            eventBus.$emit("alert", "succesful");
            this.$router.push("/");
            this.isLoading = true;
            this.res = res;
          })
          .catch(err => {
            eventBus.$emit("alert", err);
            // this.isLoading = true
          });
      } else {
        payload = {
          name: this.equipment.equipmentName,
          status: 0,
          statusName: "Created",
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        };
        equipmentEventBus
          .createEquipment(payload)
          .then(res => {
            eventBus.$emit("alert", "succesful");
            this.$router.push("/");
            this.isLoading = true;
            this.res = res;
          })
          .catch(err => {
            eventBus.$emit("alert", err);
            // this.isLoading = true
          });
      }
    }
  }
};
</script>
