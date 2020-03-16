<template>
  <div class="auth">
    <p class="title">AUTHENTICATION</p>
    <button class="google" @click="auth('google')">Google</button>
    <button class="facebook" @click="auth('facebook')">Facebook</button>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  width: 22%;
  margin: 15rem auto;
  & .title {
    font-size: 2rem;
    font-weight: 6000;
    text-align: center;
    margin-bottom: 3rem;
  }
  & .facebook, .google {
    width: 100%;
    height: 4rem;
    margin: 1rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    border: none;
    border-radius: .5rem;
  }
  & .facebook {
    background-color: #5050de;
    color: #fff;
  }
  & .google {
    background-color: #fff;
    color: #5050de;
    border: .1rem solid #5050de;
  }
}
</style>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    auth (network) {
      const hello = this.hello
      hello(network).login().then(() => {
        const authRes = hello(network).getAuthResponse()
        localStorage.setItem('ACCESS_TOKEN', 'Bearer' + ' ' + authRes.access_token)
        return hello(network).api('me').then(function (json) {
          const profile = json
          localStorage.setItem('USER_NAME', profile.name)
          localStorage.setItem('USER_PICTURE', profile.picture)
        })
      })
        .then(res => {
          this.$router.push('/')
        })
    }
  }
}
</script>
