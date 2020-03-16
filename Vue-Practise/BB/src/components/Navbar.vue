<template>
    <div class="nav" v-if="isAuth">
      <button class="company" @click="navigateToHome()">Company X</button>
      <div class="menu">
        <button class="home" @click="navigateToHome()" v-if="this.$route.path !== '/'">
               Home
        </button>
        <button class="create" @click="navigateToCreate()" v-if="this.$route.path !== '/create'">
                Create New
        </button>
        <button class="logout" @click="logout()">
               Log Out
        </button>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    .nav {
          font-size: 1.1rem;
          display: grid;
          grid-template-columns: 15rem auto;
          box-shadow: 0 0 0.8rem 0.1rem cadetblue;
          height: 6rem;
      & .menu {
          display: grid;
          grid-template-columns: auto auto auto;
          justify-content: flex-end;
        & button {
            padding: 0 4rem;
            background-color: #fff;
            flex-basis: 10%;
            color: #0c7a7d;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 0 0.8rem -0.3rem cadetblue;
        }
        & button:hover {
            background-color: #eff3f3;
            transform: scale(1.03);
        }
      }
      & .company {
        padding: 0 4rem;
        width: auto;
        background-color: #fff;
        border: none;
        cursor: pointer;
        box-shadow: 0 0 0.8rem -0.3rem cadetblue;
      }
      & .company:hover {
        background-color: #eff3f3;
        transform: scale(1.03);
      }
    }
</style>

<script>
export default {
  data () {
    return {
      isAuth: !!localStorage.getItem('ACCESS_TOKEN')
    }
  },
  methods: {
    navigateToCreate () {
      this.$router.push('/create')
    },
    navigateToHome () {
      this.$router.push('/')
    },
    async logout () {
      await localStorage.removeItem('ACCESS_TOKEN')
      this.$router.push('/auth')
    }
  }
}
</script>
