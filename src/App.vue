<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: {
    show() {
      return this.$route.meta.show
    }
  }
}
</script>

<style>
@import url('./assets/css/normalize.css');
* {
  margin: 0;
  padding: 0;
}
</style>
