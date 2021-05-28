<template>
    <b-modal size="lg" ref="schedule-form" v-model="toggle" hide-footer title="Nova Consulta">
        <b-form class="mt-2">
            <b-row align-v="center">
                <b-col cols="9">
                    <b-form-group id="input-group-name" label="Nome de Paciente" label-for="input-name" description="Nome completo do paciente">
                        <b-form-input id="input-name" v-model="patient.name" required @change="searchPatients" autocomplete="off"></b-form-input>
                        <div id="patient-list" v-if="patientList.length">
                            <span v-for="patient in patientList" :key="patient._id" @click="selectPatient(patient)">
                                {{patient.name}}
                            </span>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-button>+ Novo Paciente</b-button>
                </b-col>
            </b-row>
            <b-row align-v="center">
                <b-col cols="4">
                    <b-form-group id="input-group-cpf" label="CPF de Paciente" label-for="input-cpf" >
                        <b-form-input id="input-cpf" v-model="patient.cpf" required @change="searchPatients" autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group id="input-group-doctor" label="Doutores Disponíveis" label-for="select-doctor" >
                        <b-form-select id="select-doctor" v-model="doctorSelected" :options="doctorsList"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="5">
                    <b-form-datepicker id="datepicker" v-model="date" class="mb-2 my-3"></b-form-datepicker>
                </b-col>
                <b-col cols="3" class="py-2">
                    <b-time v-model="time" locale="en"></b-time>
                </b-col>
            </b-row>
        </b-form>
        <b-row align-h="between">
            <b-col cols="2">
                <b-button variant="outline-primary" @click="closeModal">Fechar</b-button>
            </b-col>
            <b-col cols="3" class="align-right">
                <b-button variant="primary" @click="schedulePatient">Agendar Paciente</b-button>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Schedule',
    props:['show','scheduleDate','scheduleTime'],
    components:{
    },
    data(){
        return {
            patient:{},
            patientList:[],
            date:'',
            time:'',
            doctorSelected:'',
            doctorsList:[
                {
                    text:'Paulo',
                    value:'123123123'
                },
                {
                    text:'Thais',
                    value:'123888123'
                },
            ],
        }
    },
    computed:{
        toggle:{
            get(){
                return this.$props.show;
            },
            set(value){
                this.$emit('handlerShow', value);
            }
        }
    },
    methods:{
        closeModal(){
            this.$emit('handlerShow',false);
        },
        searchPatients(value){
            if(value=="")
                return this.patientList=[];
            axios.get('/api/patients/search/name/'+value).then(res=>{
                this.patientList=res.data.docs||this.patientList;
            })
        },
        selectPatient(patient){
            this.patient=patient;
            this.patientList=[];
        },
        schedulePatient(){
            let schedule = {
                patient:this.patient,
                doctorCRO:this.doctorSelected,
                date:this.date,
                time:this.time
            }
            axios.post('/api/schedules',schedule).then(()=>{
                this.$emit('handlerShow',false);
            })
        }
    },
    watch: {
        toggle(newValue){
            if(newValue){
                this.date = this.$props.scheduleDate;
                this.time = this.$props.scheduleTime;
            }
        }
    }
}

</script>

<style>
#patient-list{
    padding: 0.5em;
    border: 1px solid rgba(200,200,200,0.5);
    border-radius: 3px;
    display: grid;
}
</style>
