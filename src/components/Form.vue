<template>
  <div class="form">
    <h1>{{ msg }}</h1>
    <p v-for="user of users">= {{user.name}} = at {{ currentLocation.lat }}</p>
  </div>
</template>

<script>
import firebaseApp from '../firebaseApp'
export default {
  name: 'form',
  data () {
    return {
      msg: 'This is form',
      users: {},
      currentLocation: {
        lat: null,
        lng: null
      }
    }
  },
  created () {
    console.log('created')
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/auth')
      }
    })
  },
  mounted () {
    console.log('mounted')
    if ('geolocation' in navigator) {
      var gl = navigator.geolocation
      gl.getCurrentPosition(function (position) {
//        this.currentLocation = position.coords
        this.currentLocation.lng = position.coords.longitude
        this.currentLocation.lat = position.coords.latitude
//        console.log(this.currentLocation)
      }.bind(this)) // bind to `this` so it's the current component.
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
