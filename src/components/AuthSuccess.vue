<template> 
  <div class="authsuccess"> 
  <b-card>
    <b-media>
      <img :src="photo" slot="aside" style="height: 100px">

      <h5 class="mt-0">{{name}}</h5>
      <p>{{email}}</p>
      <b-button @click='logOut'>Log out</b-button>

    </b-media>
  </b-card>

  </div>
</template>


<script>
import firebaseApp from '../firebaseApp'
export default {
  name: 'authsuccess',
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  mounted () {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebaseApp.auth().currentUser
        if (this.user) {
          this.name = this.user.displayName
          this.email = this.user.email
          this.photo = this.user.photoURL
          this.userId = this.user.uid
        }
      } else {
        this.$router.push('/auth')
      }
    })
  },
  methods: {
    logOut () {
      firebaseApp.auth().signOut()
      location.href = '/'
    }
  }
}
</script>
