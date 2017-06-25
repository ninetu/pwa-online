<template>
  <div class="game">
    <span style="padding:10px; position:absolute; z-index:999; color:white; font-size:1.5em; font-weight:bold;">Time: {{timeSec}}s</span>
    <a-scene>
      <a-assets>
        <audio id="click-sound" src="../assets/click.mp3"></audio>
        <img id="highlight1" src="../assets/radial-highlight.png">
        <img id="shadow3" src="../assets/radial-shadow-3.png">
        <img id="mosquito" src="../assets/mosquito.png">
        <img id="city" src="../assets/pano.jpg">

        <!-- Image link template to be reused. -->
        <script id="link" type="text/html">
          <a-entity class="link"
            geometry="primitive: plane; height: 1; width: 1"
            material="shader: flat; src: ${thumb}"
            event-set__1="_event: mousedown; scale: 1 1 1"
            event-set__2="_event: mouseup; scale: 1.2 1.2 1"
            event-set__3="_event: mouseenter; scale: 1.2 1.2 1"
            event-set__4="_event: mouseleave; scale: 1 1 1"
            set-image="on: click; target: #image-360; src: ${src}"
            sound="on: click; src: #click-sound"></a-entity>
        </script>
      </a-assets>

      <!--
      <a-entity>
        <a-entity position="0 3 -10" template="src: #link" data-src="#mosquito" data-thumb="#mosquito">
          <a-image src="#mosquito" rotation="0 0 0" scale="1 1 1"></a-image>
        </a-entity>
        <a-animation
          attribute="rotation"
          dur="10000"
          fill="forwards"
          to="0 360 0"
          repeat="indefinite"></a-animation>
      </a-entity>
      -->
      <a-entity v-for="item of items" :key="item['.key']" id="m1">
        <a-image src="#mosquito" rotation="0 0 0" scale="1 1 1" 
          v-bind:position="item.position"
          set-click="on: mouseenter; src: ${src}; target: #m1"
          sound="on: mouseenter; src: #click-sound"
          event-set__enter="_event: mouseenter; material.color: yellowgreen; scale: 1.1 1.1 1.1"
          event-set__leave="_event: mouseleave; material.color: skyblue; scale: 1 1 1"
          ></a-image>
        <a-animation
          attribute="rotation"
          dur="10000"
          fill="forwards"
          to="0 360 0"
          repeat="indefinite"></a-animation>
      </a-entity>

      <!--
      <a-entity id="m1">
        <a-image src="#mosquito" rotation="0 0 0" scale="1 1 1" position="0 3 -10"
          set-click="on: click; src: ${this}; target: #m1"
          event-set__enter="_event: mouseenter; material.color: yellowgreen; scale: 1.1 1.1 1.1"
          event-set__leave="_event: mouseleave; material.color: skyblue; scale: 1 1 1"
          ></a-image>
        <a-animation
          attribute="rotation"
          dur="10000"
          fill="forwards"
          to="0 360 0"
          repeat="indefinite"></a-animation>
      </a-entity>
      -->

      <!--
      <a-box position="0 3.5 -2" rotation="30 30 0" color="skyblue"
             set-click="on: click; src: ${src}"
             event-set__enter="_event: mouseenter; material.color: yellowgreen; scale: 3 1 1"
             event-set__leave="_event: mouseleave; material.color: skyblue; scale: 1 1 1">
        <a-animation attribute="rotation" begin="click" dur="500" fill="backwards" to="30 30 360"></a-animation>
      </a-box>
      -->

      <a-sky id="image-360" src="#city"></a-sky>

      <!--
      <a-entity camera look-controls>
        <a-cursor id="cursor"
          animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 150"
          event-set__1="_event: mouseenter; color: springgreen"
          event-set__2="_event: mouseleave; color: black"
          fuse="true"
          raycaster="objects: .link"></a-cursor>
      </a-entity>
      -->
      <a-entity position="0 1.8 4">
        <a-entity camera look-controls mouse-cursor>
          <a-cursor fuse="true" color="yellow"></a-cursor>
        </a-entity>
      </a-entity>

    </a-scene>
  </div>
</template>

<script>
var AFRAME = require('aframe')
require('aframe-animation-component')
require('aframe-event-set-component')
require('aframe-layout-component')
require('aframe-template-component')
require('aframe-mouse-cursor-component')
import firebaseApp from '../firebaseApp'
// require('./set-image.js')
export default {
  name: 'game',
  data () {
    return {
      tsBegin: Date.now(),
      tsEnd: 0,
      score: 0,
      timeSec: 0,
      timer: 30,
      items: [
        {
          key: 'id1',
          position: '0 3 -10'
        }
      ],
      left: 3,
      user: {},
      userPhoto: '',
      userId: '',
      userName: ''
    }
  },
  methods: {
    fetchEventsList: function () {
      if (this.timer <= 0) {
      } else {
        this.timer--
        this.timeSec++
      }
    }
  },
  mounted () {
    // this.fetchEventsList()
    setInterval(this.fetchEventsList, 1000)

    firebaseApp.auth().onAuthStateChanged((user) => {
      this.user = firebaseApp.auth().currentUser
      if (this.user) {
        this.userName = this.user.displayName
        this.userPhoto = this.user.photoURL
        this.userId = this.user.uid
      } else {
        this.$router.push('/auth')
      }
    })
  },
  created () {
    console.log('created')
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/auth')
      }
    })

    var _this = this
    AFRAME.registerComponent('set-image', {
      schema: {
        on: {type: 'string'},
        target: {type: 'selector'},
        src: {type: 'string'},
        dur: {type: 'number', default: 100}
      },

      init: function () {
        var data = this.data
        var el = this.el

        // this.setupFadeAnimation()
        el.addEventListener(data.on, function () {
          _this.$data.score++
          console.log(_this.$data.score)
          // Fade out image.
          // Wait for fade to complete.
          /*
          setTimeout(function () {
            // Set image.
            // data.target.setAttribute('material', 'src', data.src)
          }, data.dur)
          */
        })
      }
    })
    AFRAME.registerComponent('set-click', {
      schema: {
        on: {type: 'string'},
        src: {type: 'string'},
        target: {type: 'selector'}
      },

      init: function () {
        var data = this.data
        var el = this.el

        // this.setupFadeAnimation()
        el.addEventListener('mouseenter', function () {
          data.target.setAttribute('visible', false)
          _this.$data.score++
          _this.$data.left--
          if (_this.$data.score > 0) {
            var itemRef = firebaseApp.database().ref('items')
            var tsEnd = Date.now()
            var ts = tsEnd - _this.$data.tsBegin
            itemRef.push({
              name: _this.$data.userName,
              avatar: _this.$data.userPhoto,
              score: _this.$data.score,
              time: ts
              // time: 30 - _this.$data.timer
            })
            _this.$router.push('/score')
          }
        })
      }
    })
    // AFRAME
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
