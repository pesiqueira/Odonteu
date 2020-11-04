<template>
    <b-sidebar no-header :visible="sidebarVisible" :no-header-close="sidebarNoHeaderClose" id="sidebar-1" title="Odontome">
        <div id="calendar">
            <b-calendar :start-weekday="startWeekday" id="ex-disabled-readonly" @input="setDate"></b-calendar>
        </div>
    </b-sidebar>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from'vuex';

export default {
  name: 'left-bar',
  data: () => {
      return {
          sidebarVisible:true,
          sidebarNoHeaderClose:true,
          startWeekday:1
      }
  },
  methods:{
      ...mapMutations(['setCurrentDate']),
      setDate(date){
          let year=date.split('-')[0]
          let month=date.split('-')[1]
          let day=date.split('-')[2]
          let nDate = new Date(year, month-1, day);
          this.setCurrentDate(nDate);
      }
  }
}
</script>

<style>
    .b-sidebar {
        top: 3.5rem;
        padding: 1rem;
        border-right: 0.1rem solid #ccc;
    }
</style>