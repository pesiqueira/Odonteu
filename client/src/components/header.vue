<template>
    <header id="main-header">
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#">Odonto Me</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/#/"> <b-icon-calendar-3/> Agenda</b-nav-item>
                    <b-nav-item href="/#/Patients"> <b-icon-person/> Pacientes</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from'vuex';

export default {
  name: 'main-header',
  data: () => {
      return {
      }
  },
  methods:{
      ...mapMutations(['']),
  }
}
</script>

<style>
    #main-header {
    }
</style>