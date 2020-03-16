<template>
<div class="grid-container">
    <p class="search-query" v-if="searchQuery !== ''">Filtering by Equipment Name: '{{ searchQuery }}'</p>
    <v-app v-if="error !== ''">
      <v-alert
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
       {{ error }}
      </v-alert>
    </v-app>
    <div class="grid">
      <div class="card" v-for="(equipment, i) in paginatedEquipments" :key="i">
        <div class="data">
          <p class="name">Name: {{ equipment.name }}</p>
          <p class="quantity">Quantity: {{ equipment.quantity }}</p>
          <p class="status">Status: {{ equipment.statusName }}</p>
        </div>
        <div class="actions">
          <v-app id="inspire">
            <v-btn text icon class="cadetblue" @click="editEquipment(equipment)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn text icon color="error" @click="showConfirmModal(equipment)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-app>
        </div>
      </div>
    </div>
    <app-confirmation v-if="showModal" @close="showModal = false" @delete="deleteEquipment()"></app-confirmation>
      <div class="pagination" v-if="equipments.length > 0">
         <button @click="paginate(currentPage-1)" :disabled="currentPage === 1">&laquo;</button>
         <button v-for="(page, i) in pages" :key="i" @click="paginate(page)" :class="{'active': currentPage === page}">{{ page }}</button>
         <button @click="paginate(currentPage+1)" :disabled="currentPage === pages.length">&raquo;</button>
      </div>
    <div class="loading" v-if="isLoading">Loading&#8230;</div>
    <!-- <div class="alert-toast">
         <v-app v-if='createSuccesfull'>
        <v-alert
          border="right"
          colored-border
          type="error"
          elevation="2"
        >
        {{ error }}
        </v-alert>
      </v-app>
       </div> -->
</div>
</template>

<style lang="scss">

.v-alert {
  width: 100%;
}

/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: cadetblue 1.5em 0 0 0, cadetblue 1.1em 1.1em 0 0, cadetblue 0 1.5em 0 0, cadetblue -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, cadetblue 0 -1.5em 0 0, cadetblue 1.1em -1.1em 0 0;
  box-shadow: cadetblue 1.5em 0 0 0, cadetblue 1.1em 1.1em 0 0, cadetblue 0 1.5em 0 0, cadetblue -1.1em 1.1em 0 0, cadetblue -1.5em 0 0 0, cadetblue -1.1em -1.1em 0 0, cadetblue 0 -1.5em 0 0, cadetblue 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.v-application--wrap {
  min-height: 100% !important;
  display: contents;
}
/* Grid */
.grid-container {
    font-size: 1.1rem;
    width: 70vw;
    margin: auto;
    padding: 3rem 0;
    & .grid {
        width: 100%;
        display: grid;
        margin-bottom: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
        grid-template-rows: inherit;
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        & .card {
        border-bottom: 0.3rem solid cadetblue;
        width: 100%;
        display: -ms-flexbox;
        display: grid;
        padding: 4rem;
        box-shadow: 0 0 0.8rem -0.3rem cadetblue;
        grid-template-columns: auto auto;
        grid-template-rows: auto;
        align-items: center;
        justify-content: space-between;
        & .actions {
            & >.v-application {
              display: grid;
            }
            & .cadetblue {
              color: cadetblue;
            }
        }
        & .data{
            flex-basis: 90%;
            color: #0c7a7d;
            & .name, .status, .quantity {
            flex-basis: 30%;
            margin: 2rem 0;
            }
        }
    }
    }
    & .pagination {
        display: flex;
        flex-basis: 100%;
        justify-content: center;
        margin: 4rem 0;
        & button {
          cursor: pointer;
          padding: .7rem 1.5rem;
          background-color: #fff;
          color: cadetblue;
          border: .1rem solid cadetblue;
          box-shadow: 0 0 0.8rem -0.3rem cadetblue;
        }
        & button:disabled {
          cursor: not-allowed;
          background-color: #eff3f3;
        }
        & .active {
          background-color: cadetblue;
          color: #fff;
          border: .1rem solid cadetblue;
        }
    }
    // & .error {
    //     text-align: center;
    //     width: 100%;
    //     color: #e60000;
    // }
    & .search-query {
      text-align: center;
      width: 100%;
      margin-bottom: 1rem;
    }
}
@media screen and (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)) !important;
  }
}
</style>

<script>
import { eventBus } from '../main'
import { equipmentEventBus } from '../eventBus/equipment'
// import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      equipment: null,
      equipments: [],
      paginatedEquipments: [],
      searchQuery: '',
      isLoading: true,
      error: '',
      showModal: false,
      pageCount: 0,
      pages: [],
      currentPage: 1,
      pageSize: 8,
      createSuccesfull: false
    }
  },
  created () {
    this.currentPage = this.$store.getters.getCurrentPage
    console.log('getCurrentPage', this.currentPage, this.$store.getters.getCurrentPage)
    this.getEquipments('').then(res => {
      if (typeof res === 'string') {
        this.error = res
        this.equipments = []
      } else {
        this.error = ''
        this.equipments = res
      }
      console.log('getCurrentPage 1')
      this.paginate(this.currentPage)
    })
    eventBus.$on('searchQuery', (searchQuery) => {
      this.getEquipments(searchQuery).then(res => {
        if (typeof res === 'string') {
          this.error = res
          this.equipments = []
        } else {
          this.error = ''
          this.equipments = res
        }
        this.searchQuery = searchQuery
        console.log('getCurrentPage 2')
        this.paginate(this.currentPage)
      })
    })

    eventBus.$on('alert', (res) => {
      this.createSuccesfull = true
      setTimeout(this.createSuccesfull = false, 5000)
      this.message = res
    })

    eventBus.$on('resetFilter', (isReset) => {
      this.getEquipments('').then(res => {
        if (typeof res === 'string') {
          this.error = res
          this.equipments = []
        } else {
          this.error = ''
          this.equipments = res
        }
        this.searchQuery = ''
        console.log('getCurrentPage 3')
        this.paginate(this.currentPage)
      })
    })
  },
  methods: {
    getEquipments (searchQuery) {
      this.isLoading = true
      return equipmentEventBus.getEquipments(searchQuery).then(res => {
        return res
      })
    },
    editEquipment (equipment) {
      this.$router.push('/create/' + equipment.id)
    },
    showConfirmModal (equipment) {
      this.equipment = equipment
      this.showModal = true
    },
    deleteEquipment () {
      this.isLoading = true
      equipmentEventBus.deleteEquipment(this.equipment.id)
        .then(res => {
          this.isLoading = false
          this.showModal = false
          this.getEquipments('').then(res => {
            if (typeof res === 'string') {
              this.error = res
              this.equipments = []
            } else {
              this.error = ''
              this.equipments = res
            }
            this.paginate(1)
          })
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.showModal = false
        })
    },
    paginate (pageNum) {
      console.log('paginate 1')
      this.$store.dispatch('setCurrentPage', pageNum)
      if (Number((this.equipments.length / this.pageSize)) > Number((this.equipments.length / this.pageSize).toString().split('.')[0])) {
        this.pageCount = Number((this.equipments.length / this.pageSize).toString().split('')[0]) + 1
      } else {
        this.pageCount = Number((this.equipments.length / this.pageSize))
      }
      if (pageNum < 1) {
        pageNum = 1
      } else if (pageNum > this.pageCount) {
        pageNum = this.pageCount
      }
      this.currentPage = pageNum
      console.log('pageNum', pageNum, this.equipments)
      console.log('this.equipments / 3', Number((this.equipments.length / this.pageSize).toString().split('')[0]))
      this.paginatedEquipments = this.equipments.slice((pageNum - 1) * this.pageSize, pageNum * this.pageSize)
      const pageArray = new Array(this.pageCount)
      let newArray = []
      for (var i = 0; i < pageArray.length; i++) {
        newArray.push(i + 1)
      }
      this.pages = newArray
      newArray = []
      this.isLoading = false
    }
  },
  computed: {
    // ...mapGetters({
    //   currentPage: 'getCurrentNumber'
    // })
  }
}
</script>
