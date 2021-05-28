<template>
    <div id="main-calendar">
        <b-row> 
            <b-col>
                {{getCurrentDate.toLocaleString('default',{day:'2-digit', month:'long', year:'numeric'})}}
            </b-col>
        </b-row>
        <b-row class="week-days">
            <div id="left-hours">
                <div class="left-hour" v-for="hour in hours" :key="'hour-'+hour">
                    <div class="left-minute">
                        {{hour + ":00"}}
                    </div>
                    <div class="left-minute" v-for="min in 3" :key="'minute-'+(min*15)">
                    </div>
                </div>
            </div>
            <b-col class="week-day" v-for="(weekDay,index) in weekDays" :key="weekDay.Day">{{weekDay.weekDay + ' - ' + weekDay.Day}}
                    <b-row id="actual-time" v-if="actualWeekday==index+1"></b-row>
                    <b-row class="main-hour" v-for="hour in hours" :key="'hour-'+hour">
                        <div class="main-minute" v-for="min in 4" :key="'minute-'+(min*15)" @click="showModal(weekDay.date,hour,(min*15)-15)">
                            <template v-for="schedule in schedulesList" >
                                <div class="schedule" v-if="checkSchedule(schedule,weekDay,hour,min)" :key="schedule._id">
                                    {{schedule.patient.name.substr(0,15)}}
                                </div>
                            </template>
                        </div>
                    </b-row>
            </b-col>
        </b-row>
    <Schedule @handlerShow="showModal" :show="showSchedule" :scheduleDate="scheduleDate" :scheduleTime="scheduleTime"/>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import Schedule from './schedule.vue';
import axios from 'axios';
export default {
    name: 'main-calendar',
    components: {
        Schedule
    },
    mounted() {
        let date = new Date();
        let timeRow = document.getElementById('actual-time');
        setInterval(() => {
            let todayTime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),7)/1000|0;
            timeRow.style.marginTop = (((date.getTime()/1000|0) - todayTime)/37.1) + 'px';
        },1000);
        this.getSchedules();
    },
    data: () => {
        return {
            hours:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
            showSchedule:false,
            actualWeekday: new Date().getDay(),
            scheduleDate:'',
            scheduleTime:'',
            schedulesList: []
        }
    },
    methods:{
        ...mapMutations(['setCurrentDate']),
        getWeekDay(day){
            let weekDate = new Date(this.getCurrentDate.getFullYear(), this.getCurrentDate.getMonth(), day);
            return weekDate.getDate();
        },
        showModal(date,hour,minute){
            this.scheduleDate=date;
            this.scheduleTime=`${hour}:${minute}:00`
            this.showSchedule=!this.showSchedule;
        },
        getSchedules(){
            axios.get('/api/schedules').then(({data})=>{
                let res = data.docs.length?data.docs:[];
                this.schedulesList = res;
            }).catch(err=>console.log(err));
        },
        checkSchedule(schedule,weekDay,hour,min){
            min = min*15-15;
            let scheduleMin = Number(schedule.time.split(':')[1]);
            return schedule.date==weekDay.date&&schedule.time.substr(0,2)==`${hour}`&&min<=scheduleMin&&scheduleMin<min+15
        }
    },
    computed:{
        ...mapGetters(['getCurrentDate']),
        formattedCurrentDate(){
            return `${this.getCurrentDate.getDate()}/${this.getCurrentDate.getMonth()+1}/${this.getCurrentDate.getFullYear()}`
        },
        weekDays(){
            let weekDaysArray = [];
            let days =['Seg','Ter','Qua','Qui','Sex','Sab','Dom'];
            for (let i=0; i<days.length; ++i) {
                const element = days[i];
                weekDaysArray.push({
                    date: `${this.getCurrentDate.getFullYear()}-${this.getCurrentDate.getMonth()+1}-${((i+1) - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate()}`,
                    weekDay:element,
                    Day: this.getWeekDay(((i+1) - this.getCurrentDate.getDay()) + this.getCurrentDate.getDate())
                })
            }
            return weekDaysArray;
        }
    }
}
</script>

<style>
    #main-calendar{
        height: 51rem;
        margin-left:20rem;
        padding-left: 0.8rem;
        overflow: scroll;
        overflow-x: hidden;
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
        padding-top:1.55rem;
    }
    #actual-time{
        position: absolute;
        width:100%;
        height: 1px;
        background-color:red
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
    .schedule{
        background-color:white;
        position: absolute;
        padding:0.7em 0;
        min-width: 11.6em;
        border: 1px solid rgba(50,50,50,0.5);
    }
</style>