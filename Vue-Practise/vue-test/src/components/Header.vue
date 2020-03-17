<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" style="cursor: pointer" @click="NavigateToHome" >Company X</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     
    </ul>
    <ul  class="navbar-nav">
        <li class="nav-item active">
        <a class="nav-link" style="cursor: pointer" @click="navigateToCreate">Create <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" style="cursor: pointer" @click="logOut">Log Out</a>
      </li>
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
</nav>
</template>

<script>
// import eventBus from "../main";
export default {
    data() {
    return {
      isUserLoggedIn: false,
      loggedInUser: {},
      isInGridPage: true
    };
  },

  methods: {
      logOut(){
          localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
          localStorage.removeItem('USER_PICTURE');
           this.$router.push('/auth')
      },
      navigateToCreate() {
          this.$router.push('/create')
      },
      NavigateToHome() {
          this.$router.push('/')
      }

  }
}
</script>

<style scoped>
.app-container {
  margin: auto;
  width: 67%;
}
.navbar-right {
  cursor: pointer !important;
}

@media screen and (max-width: 800px) {
  .app-container {
    width: 100%;
  }
}
</style>