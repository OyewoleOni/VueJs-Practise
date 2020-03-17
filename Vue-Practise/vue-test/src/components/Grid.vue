<template>
  <div>
    <div class="row">
      <form
        style="display: flex; margin: auto"
        action=""
        class="col-offset-4 form-group mb-4"
      >
        <input
          type="text"
          style="width: 400px"
          class="form-control"
          v-model="searchQuery"
        />
        <button class="btn btn-secondary" @click.prevent="searchEquipments()">Search</button>
      </form>
    </div>
    
    <div class="row">
      <div class="container" style="position: relative">
         <div v-if="isLoading" class="spinner-border" role="status" style="position: absolute; top: 200px">
          <span class="sr-only">Loading...</span>
        </div>
        <table class="table table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Equipment Name</th>
              <th scope="col">Status Name</th>
              <th scope="col">Quantity</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in paginatedEquipments" :key="index">
              <td>{{ data.name }}</td>
              <td>{{ data.statusName }}</td>
              <td>{{ data.quantity }}</td>
              <td style="cursor: pointer" @click="editEquipment(data)">
                <font-awesome-icon
                  icon="edit"
                  class="icon-c"
                  @click="editEquipment(data)"
                ></font-awesome-icon>
              </td>
              <td style="cursor: pointer" @click="showConfirmModal(data)">
                <font-awesome-icon
                  icon="trash"
                  class="icon-c"
                  @click="notifAlert(data.id)"
                  style="color: red"
                ></font-awesome-icon>
              </td>
            </tr>
          </tbody>
        </table>
        <app-confirmation
          v-if="showModal"
          @close="showModal = false"
          @delete="deleteEquipment()"
        ></app-confirmation>
        <div class=" pagination justify-content-center mb-3" v-if="equipments.length > 0">
          <button class="page-link"
            @click="paginate(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            &laquo;
          </button>
          <button class="page-link"
            v-for="(page, i) in pages"
            :key="i"
            @click="paginate(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
          <button class="page-link"
            @click="paginate(currentPage + 1)"
            :disabled="currentPage === pages.length"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { equipmentEventBus } from "../services/equipment";
export default {
  data() {
    return {
      responseDatas: [],
      equipment: null,
      equipments: [],
      paginatedEquipments: [],
      pageCount: 0,
      pages: [],
      currentPage: 1,
      pageSize: 8,
      showModal: false,
      isLoading: false,
      searchQuery: ""
    };
  },
  created() {
    this.isLoading = true;
    // this.currentPage = this.$store.getters.getCurrentPage
    // console.log('getCurrentPage', this.currentPage, this.$store.getters.getCurrentPage)
    this.getEquipments("").then(res => {
      if (typeof res === "string") {
        this.error = res;
        this.equipments = [];
         this.isLoading = false;
      } else {
        this.error = "";
        this.equipments = res;
         this.isLoading = false;
      }
      console.log("getCurrentPage 1");
      this.paginate(this.currentPage);
    });
    eventBus.$on("searchQuery", searchQuery => {
      this.getEquipments(searchQuery).then(res => {
        if (typeof res === "string") {
          this.error = res;
          this.equipments = [];
          this.isLoading = false;
        } else {
          this.error = "";
          this.equipments = res;
          this.isLoading = false;
        }
        this.searchQuery = searchQuery;
        console.log("getCurrentPage 2");
        this.paginate(this.currentPage);
      });
    });

    eventBus.$on("alert", res => {
      this.createSuccesfull = true;
      setTimeout((this.createSuccesfull = false), 5000);
      this.message = res;
    });

    // eslint-disable-next-line no-unused-vars
    eventBus.$on("resetFilter", isReset => {
      this.getEquipments("").then(res => {
        if (typeof res === "string") {
          this.error = res;
          this.equipments = [];
          this.isLoading = false;
        } else {
          this.error = "";
          this.equipments = res;
          this.isLoading = false;
        }
        this.searchQuery = "";
        console.log("getCurrentPage 3");
        this.paginate(this.currentPage);
      });
    });
  },
  methods: {
    getEquipments(searchQuery) {
      this.isLoading = true;
      return equipmentEventBus.getEquipments(searchQuery).then(res => {
        return res;
      });
    },
    editEquipment(equipment) {
      console.log(equipment);
      this.$router.push("/create/" + equipment.id);
    },
    showConfirmModal(equipment) {
      console.log(equipment);
      this.equipment = equipment;
      this.showModal = true;
    },

    searchEquipments() {
      console.log(this.searchQuery);
      this.getEquipments(this.searchQuery).then(res => {
        if (typeof res === "string") {
          this.error = res;
          this.equipments = [];
          this.isLoading = false;
        } else {
          console.log(res);
          this.error = "";
          this.equipments = res;
          this.isLoading = false;
        }
        // this.searchQuery = searchQuery;
        console.log("getCurrentPage 2");
        this.paginate(this.currentPage);
      });
    },

    deleteEquipment() {
      this.isLoading = true;
      equipmentEventBus
        .deleteEquipment(this.equipment.id)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.isLoading = false;
          this.showModal = false;
          this.getEquipments("").then(res => {
            if (typeof res === "string") {
              this.error = res;
              this.equipments = [];
            } else {
              this.error = "";
              this.equipments = res;
            }
            this.paginate(1);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    paginate(pageNum) {
      console.log("paginate 1");
      // this.$store.dispatch('setCurrentPage', pageNum)
      if (
        Number(this.equipments.length / this.pageSize) >
        Number(
          (this.equipments.length / this.pageSize).toString().split(".")[0]
        )
      ) {
        this.pageCount =
          Number(
            (this.equipments.length / this.pageSize).toString().split("")[0]
          ) + 1;
      } else {
        this.pageCount = Number(this.equipments.length / this.pageSize);
      }
      if (pageNum < 1) {
        pageNum = 1;
      } else if (pageNum > this.pageCount) {
        pageNum = this.pageCount;
      }
      this.currentPage = pageNum;
      console.log("pageNum", pageNum, this.equipments);
      console.log(
        "this.equipments / 3",
        Number((this.equipments.length / this.pageSize).toString().split("")[0])
      );
      this.paginatedEquipments = this.equipments.slice(
        (pageNum - 1) * this.pageSize,
        pageNum * this.pageSize
      );
      const pageArray = new Array(this.pageCount);
      let newArray = [];
      for (let i = 0; i < pageArray.length; i++) {
        newArray.push(i + 1);
      }
      this.pages = newArray;
      newArray = [];
    }
  }
};
</script>
