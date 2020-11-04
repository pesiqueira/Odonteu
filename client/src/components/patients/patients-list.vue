<template>
    <b-container id="patient-list">
        <b-row align-h="between" class="mt-5">
            <b-col cols="2" class="float-left">
                <h2>Pacientes</h2>
            </b-col>
            <b-col cols="2">
                <b-button @click="showPatientForm"> Novo Paciente </b-button>
            </b-col>
        </b-row>
        <b-row class="mt-4">
            <b-col cols="4">
                <b-input type="search"/>
            </b-col>
        </b-row>
        <b-table class="mt-3" hover :fields="fields" :items="items">
            <template #cell(idpacientes)="data">
                <b-icon-pencil-square></b-icon-pencil-square>
                <b-icon-trash @click="deletePatient(data.value)"></b-icon-trash>
            </template>

        </b-table>
    </b-container>
</template>

<script>
import EventBus from '../event-bus.vue';
import axios from "axios";
export default {
    name: 'PatietList',
    data(){
        return{
            items:[],
            fields:[
                {key: 'name'     , label: 'Nome'   },
                {key: 'cpf'      , label: 'CPF'    },
                {key: 'cellphone', label: 'Celular'},
                {key: 'idpacientes', label: ''}
            ]
        }
    },
    components:{
    },
    methods:{
        showPatientForm(){
            EventBus.$emit('TOGGLE_PATIENT_FORM');
        },
        updatePatients(){
            let v = this;
            v.items = [];
            try{
                axios.get('http://localhost:1607/api/patients').then(({data})=>{
                    data.forEach(patient => {
                        let itemPatient = {}
                        for (const key in patient) {
                            if (Object.prototype.hasOwnProperty.call(patient,key)) {
                                const element = patient[key];
                                itemPatient[key.replace('paciente_','')] = element
                            }
                        }
                        v.items.push(itemPatient);
                    });
                }).catch(err=>console.log(err));
            }catch (e){
                console.log('error in db')
            }
        },
        deletePatient(idPatient){
            let v = this;
            try{
                axios.delete('http://localhost:1607/api/patient/'+idPatient).then(({status})=>{
                    if(status==200)
                        v.updatePatients();
                    else
                        console.log(status);
                })
            }catch (e){
                console.log('error in db')
            }
        }
    },
    mounted(){
        this.updatePatients();
        EventBus.$on('TOGGLE_PATIENT_FORM',()=>this.updatePatients());
    }
}
</script>

<style>
</style>
