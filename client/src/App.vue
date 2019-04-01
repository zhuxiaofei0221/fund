<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  components: {},
  created(){
    if(localStorage.access_token){
      const decoded = jwt_decode(localStorage.access_token);
      this.$store.dispatch('setAuth',!this.isEmpty(decoded));
      this.$store.dispatch('setUser',decoded);
    }
  },
  methods: {
    isEmpty(value){
      return (
        value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.tirm().length === 0)
      );
    }
  }
}
</script>

<style>
html,body,#app {
  height: 100%;
  width: 100%
}
</style>
