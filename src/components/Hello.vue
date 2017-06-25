<template>
  <div class="hello">
        <h1>Mosquito Hunt</h1>
        <b-button to="/game" block="true" variant="success" size="lg">Start Game</b-button>
        <b-button to="/score" block="true" variant="outline-success" size="lg">Score Board</b-button>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin:10px;
}
</style>
