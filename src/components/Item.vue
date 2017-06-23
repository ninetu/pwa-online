<template>
  <div class="item">

    <h1>{{ item.name }}</h1>
    <p>{{ item.brief }}</p>
    <p>{{ $route.params.id }}</p>

  </div>
</template>

<script>
import db from '../db'
export default {
  name: 'item',
  data () {
    return {
      id: this.$route.params.id,
      item: {},
      msg: 'This is item',
      currentLocation: {
        lat: null,
        lng: null
      }
    }
  },
  firebase () {
    return {
      item: {
        source: db.ref('items/' + this.$route.params.id),
        asObject: true,
        cancelCallback (err) {
          console.log(err)
        }
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
