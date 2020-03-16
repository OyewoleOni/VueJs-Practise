import Vue from 'vue'

export const equipmentEventBus = new Vue({
//   data () {
//     return {
//       error: ''
//     }
//   },
  methods: {
    getEquipments (searchQuery) {
      let queryUrl = ''
      if (searchQuery === '') {
        queryUrl = 'http://etestapi.test.eminenttechnology.com/api/Equipment'
      } else {
        queryUrl = `http://etestapi.test.eminenttechnology.com/api/Equipment/search?name=${searchQuery}`
      }
      return this.$http.get(queryUrl)
        .then(response => response.json())
        .then(json => {
          return json
        })
        .catch(err => {
          if (err.status === 404) {
            this.error = err.body
            return this.error
          }
        })
    },
    getEquipment (id) {
      return this.$http.get(`http://etestapi.test.eminenttechnology.com/api/Equipment/${id}`)
    },
    deleteEquipment (id) {
      return this.$http.delete(`http://etestapi.test.eminenttechnology.com/api/Equipment/${id}`)
    },
    createEquipment (payload) {
      return this.$http.post('http://etestapi.test.eminenttechnology.com/api/Equipment', payload)
    },
    editEquipment (id, payload) {
      return this.$http.put(`http://etestapi.test.eminenttechnology.com/api/Equipment/${id}`, payload)
    }
  }
})
