<template>
  <div class="score">

    <h1>Scoreboard</h1>
            <b-button to="/game" block="true" variant="success" size="lg">Start Game</b-button>
            <b-button to="/success" block="true" variant="outline-success" size="lg">My Profile</b-button>
    <b-card v-for="item of items" :key="item['.key']" style="margin-top:1em">
      <b-media>
        <img slot="aside" v-bind:src="item.avatar" style="height:64px">
        <h5 class="mt-0">{{ item.name }}</h5>
        <p>Time: {{item.time}} ms</p>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import firebaseApp from '../firebaseApp'
var db = firebaseApp.database()
export default {
  name: 'score',
  data () {
    return {
      items: {}
    }
  },
  firebase: {
    items: {
      source: db.ref('items').orderByChild('time'),
      cancelCallback (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.score {
  margin:10px;
}
</style>
