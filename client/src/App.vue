<template>
  <div id="app">
    <main-header/>
    <router-view/>
    <patient-form/>
  </div>
</template>

<script>
import mainHeader from './components/header.vue';
import PatientForm from './components/patients/patients-form.vue'
export default {
  name: 'App',
  components:{
    mainHeader,
    PatientForm
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
