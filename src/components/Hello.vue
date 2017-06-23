<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-for="user of users">= {{user.name}} =</p>
  </div>
</template>

<script>
import db from '../db'

console.log(db.ref('users'))
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Firebase Hosting',
      users: {}
    }
  },
  firebase: {
    users: {
      source: db.ref('users'),
      cancelCallback (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
