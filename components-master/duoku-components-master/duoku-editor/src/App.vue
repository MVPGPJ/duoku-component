<template>
  <div id="app">
    <textarea id= "textArea"></textarea>
    <c-editor></c-editor>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// es modules
// import Editor from '@tinymce/tinymce-vue';
// commonjs require
// NOTE: default needed after require
var Editor = require('@tinymce/tinymce-vue').default;


export default {
  name: 'app',
  components: {
    'cEditor':Editor
  },
  mounted () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
