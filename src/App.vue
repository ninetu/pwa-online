<template>
  <div id="app">
    <header id="header">
    <div class="header clearfix">
        <b-nav class="pull-right">
            <b-nav-item :to="'/near'">Near</b-nav-item>
            <b-nav-item :to="'/form'">Add New</b-nav-item>
            <b-nav-item :to="'/auth'"><img :src="userPhoto" v-if="userPhoto" style="height: 24px">{{ displayName }}</b-nav-item>
        </b-nav>
        <b-link class="navbar-brand" :to="'/'">
        <span>VR Mosquito</span>
        </b-link>
      </div>        
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebaseApp from './firebaseApp'
export default {
  name: 'app',
  data () {
    return {
      userPhoto: '',
      displayName: 'Sign-in',
      user: {}
    }
  },
  created () {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebaseApp.auth().currentUser
        if (this.user) {
          this.name = this.user.displayName
          this.email = this.user.email
          this.photo = this.user.photoURL
          this.userId = this.user.uid
        }
        this.displayName = this.user.displayName
        this.userPhoto = this.user.photoURL
      }
    })
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  margin:0px;
}

.nav { float:right; }

header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

/* Custom page header */
header {
  display:none;
  padding-top: 5px;
  padding-bottom: 5px;
}
/* Make the masthead heading the same height as the navigation */
header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}
</style>
