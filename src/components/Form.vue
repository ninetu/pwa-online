<template>
  <div class="form">

  <b-form-input v-model="item.name" type="text" placeholder="Name" :state="text.length?'success':'warning'" ></b-form-input>
  <br>

  <b-form-input v-model="item.price" type="text" placeholder="Price" :state="text.length?'success':'warning'" ></b-form-input>

  <br>
  <b-form-input textarea v-model="item.brief" placeholder="Detail"></b-form-input>

  <br>

  <b-form-file v-model="file1" choose-label="Add Photo"></b-form-file>

  <br><br>
  <b-button @click='submitForm'>Submit</b-button>
  <p v-for="user of users">= {{user.name}} = at {{ currentLocation.lat }}</p>
  </div>
</template>

<script>
import firebaseApp from '../firebaseApp'
export default {
  name: 'form',
  data () {
    return {
      file1: '',
      item: {
        name: '',
        brief: '',
        price: 0,
        lat: '',
        lng: ''
      },
      text: 'This is form',
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
  },
  methods: {
    format (value) {
      return value.toLowerCase()
    },
    submitForm () {
      // var itemRef = firebaseApp.database().ref('items')
      this.item.lat = this.currentLocation.lat
      this.item.lng = this.currentLocation.lng
      // itemRef.push(this.item)
      this.$toasted.show('Save completed')
      console.log(this.file1)
      var reader = new FileReader()
      console.log(reader.readAsDataURL(this.file1))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
