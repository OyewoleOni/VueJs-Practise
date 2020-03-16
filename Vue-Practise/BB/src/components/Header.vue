<template>
<div class="header">
    <div class="menu">
        <app-nav></app-nav>
    </div>
    <div class="top">
        <div class="search" v-if="this.$route.path == '/'">
            <input type="text" class="search-input" placeholder="Enter Search Query" v-model="searchQuery">
            <v-app id="inspire" class="buttons">
                <v-btn small class="search-btn" @click="filterEquipments()" v-if="searchQuery !== ''">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn small @click="resetFilter()">
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
            </v-app>
        </div>
    </div>
</div>
</template>

<style lang="scss">

    .header {
        font-size: 1.1rem;
        width: 100%;
        & .top {
            width: 45rem;
            margin: auto;
            margin-top: 3rem;
            & .search {
                position: relative;
                & .search-input {
                    height: 4rem;
                    font-size: 1.1rem;
                    width: 100%;
                    padding: 0 5rem;;
                    border-radius: .5rem;
                    border: .1rem solid cadetblue;
                    box-shadow: 0 0 0.8rem -0.3rem cadetblue;
                }
                & .buttons {
                    background: #FFFFFF;
                    position: absolute;
                    color: rgba(0, 0, 0, 0.87);
                    top: 0;
                    right: 0;
                    height: 100%;
                    & button {
                        color: cadetblue;
                        height: 100%;
                        border: .1rem cadetblue solid;
                        border-radius: 0 .5rem .5rem 0;
                        cursor: pointer;
                        & img {
                            width: 2rem;
                            height: 2rem;
                        }
                    }
                    & button:hover {
                        background-color: cadetblue;
                        transform: scale(1.05);
                        color: #fff;
                    }
                    & .search-btn {
                        border-radius: 0;
                }
                }
            }
        }
    }
    @media screen and (max-width: 480px) {
        .top {
            width: 20rem !important;
        }
        .nav {
            grid-template-columns: 35% 65% !important;
            & .menu {
                grid-template-columns: 50% 50% !important;
            }
        }
    }
</style>
<script>
import { eventBus } from '../main'
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    filterEquipments () {
      eventBus.$emit('searchQuery', this.searchQuery)
      this.searchQuery = ''
    },
    resetFilter () {
      eventBus.$emit('resetFilter', true)
      this.searchQuery = ''
    }
  }
}
</script>
