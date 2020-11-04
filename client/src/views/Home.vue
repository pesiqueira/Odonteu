<template>
  <div class="home">
    <left-bar/>
    <main-calendar/>
  </div>
</template>

<script>
// @ is an alias to /src
import leftBar from '../components/left-bar.vue';
import mainCalendar from '../components/calendar/main-calendar.vue';

export default {
  name: 'Home',
  components: {
    leftBar,
    mainCalendar
  }
}
</script>
