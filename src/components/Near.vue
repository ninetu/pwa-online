<template>
  <div class="near">
    <h1>{{ msg }}</h1>
    <p v-for="user of users">= {{user.name}} = at {{ currentLocation.lat }}</p>

    <b-card v-for="item of items" :key="item['.key']">
        <router-link :to="{path: '/item/'+item['.key']}">
      <b-media>
        <img slot="aside" src="https://placeholdit.imgix.net/~text?txt=64x64&w=64&h=64">
        <h5 class="mt-0">{{ item.name }}</h5>
        <p>{{ item.brief }}</p>
      </b-media>
        </router-link>
    </b-card>
  </div>
</template>

<script>
import firebaseApp from '../firebaseApp'
var db = firebaseApp.database()
export default {
  name: 'near',
  data () {
    return {
      items: {},
      msg: 'This is near',
      users: {},
      currentLocation: {
        lat: null,
        lng: null
      }
    }
  },
  firebase: {
    items: {
      source: db.ref('items'),
      cancelCallback (err) {
        console.log(err)
      }
    },
    users: {
      source: db.ref('users'),
      cancelCallback (err) {
        console.log(err)
      }
    }
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
