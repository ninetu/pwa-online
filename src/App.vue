<template>
  <div id="app">
    <header>
    <div class="header clearfix">
        <b-nav class="pull-right">
            <b-nav-item :to="'/near'">Near</b-nav-item>
        </b-nav>
        <b-link class="navbar-brand" :to="'/'">
        <span>Firebase</span>
        </b-link>
      </div>        
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
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
  margin-top: 40px;
  margin-left:15px;
  margin-right:15px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
/* Make the masthead heading the same height as the navigation */
header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}
</style>
