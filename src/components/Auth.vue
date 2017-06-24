<template>
  <div class="auth">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
require('../../node_modules/firebaseui/dist/firebaseui.css')
import firebaseApp from '../firebaseApp'
import firebaseui from 'firebaseui'
var ui = new firebaseui.auth.AuthUI(firebaseApp.auth())
export default {
  name: 'auth',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/#/success',
      signInOptions: [
        firebaseApp.firebase_.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  created () {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/success')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
