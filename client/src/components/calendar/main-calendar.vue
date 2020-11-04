<template>
    <div id="main-calendar">
        <b-row> 
            <b-col>
                {{getCurrentDate.toLocaleString('default',{day:'2-digit', month:'long', year:'numeric'})}}
            </b-col>
        </b-row>
        <b-row class="week-days">
            <div id="left-hours-space"></div>
            <b-col class="week-day" v-for="weekDay in weekDays" :key="weekDay.Day">{{weekDay.weekDay + ' - ' + weekDay.Day}}</b-col>
        </b-row>
        <b-row>
            <div id="left-hours">
                <div class="left-hour" v-for="hour in hours" :key="'hour-'+hour">
                    <div class="left-minute">
                        {{hour + ":00"}}
                    </div>
                    <div class="left-minute" v-for="min in 4" :key="'minute-'+(min*15)">
                    </div>
                </div>
            </div>
            <b-col v-for="weekDay in weekDays" :key="'hours-'+weekDay.Day">
                <b-row class="main-hour" v-for="hour in hours" :key="'hour-'+hour">
                    <div class="main-minute"></div>
                    <div class="main-minute" v-for="min in 4" :key="'minute-'+(min*15)">
                    </div>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';

export default {
  name: 'main-calendar',
  data: () => {
      return {
          hours:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      }
  },
  methods:{
      ...mapMutations(['setCurrentDate']),
      getWeekDay(day){
          let weekDate = new Date(this.getCurrentDate.getFullYear(), this.getCurrentDate.getMonth(), day);
          return weekDate.getDate();
      }
  },
  computed:{
      ...mapGetters(['getCurrentDate']),
      formattedCurrentDate(){
          return `${this.getCurrentDate.getDate()}/${this.getCurrentDate.getMonth()+1}/${this.getCurrentDate.getFullYear()}`
      },
      weekDays(){
          return [
              {
                  weekDay:'Seg',
                  Day: this.getWeekDay((1 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Ter',
                  Day: this.getWeekDay((2 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Qua',
                  Day: this.getWeekDay((3 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Qui',
                  Day: this.getWeekDay((4 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Sex',
                  Day: this.getWeekDay((5 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Sab',
                  Day: this.getWeekDay((6 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              },
              {
                  weekDay:'Dom',
                  Day: this.getWeekDay((7 - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
              }
          ]
      }
  }
}
</script>

<style>
    #main-calendar{
        margin-left:21rem;
    }
    #left-hours, .main-hour{
        display:block;
    }
    #left-hours-space{
        border:0.1px solid rgba(200,200,200,0.5);
        border-left:0.1px solid rgba(200,200,200,0.5);
        margin-left:-0.4px;
    }
    #left-hours, #left-hours-space{
        width:3rem;
    }
    .left-minute, .main-minute{
        border: 0.1px solid rgba(200,200,200,0.5);
        height:1.5rem;
    }
    .left-minute{
        background-color: rgba(0, 123, 255,0.1);
    }
    .left-hour, .main-hour{
        border: 0.1px solid rgba(200,200,200,0.5);
    }
    .week-days, .week-day{
        border:1px solid rgba(200,200,200,0.5);
        border-bottom: 0.1px solid rgba(200,200,200,0.5);
    }
</style>