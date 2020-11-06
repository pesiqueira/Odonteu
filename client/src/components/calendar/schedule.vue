<template>
    <b-modal size="lg" ref="schedule-form" v-model="toggle" hide-footer title="Nova Consulta">
        <b-form class="mt-2">
            <b-row>
                <b-col cols="10">
                    <b-form-group id="input-group-name" label="Paciente" label-for="input-name" description="Nome completo do paciente">
                        <b-form-input id="input-name" v-model="form.name" required ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-button>+ Novo Paciente</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="input-group-cpf" label="* CPF" label-for="input-cpf">
                    <b-form-input id="input-cpf" v-model="form.cpf" required ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="input-group-rg" label="* RG" label-for="input-rg">
                    <b-form-input id="input-rg" v-model="form.rg" required ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <b-row align-h="between">
        <b-col cols="2">
            <b-button variant="outline-primary">Fechar</b-button>
        </b-col>
        <b-col cols="3" class="align-right">
            <b-button variant="primary">Agendar Paciente</b-button>
        </b-col>
        </b-row>
    </b-modal>
</template>

<script>
export default {
    name: 'Schedule',
    props:{
        input: {
            type:Boolean,
            default:false
        },
    },
    components:{
    },
    data(){
        return {
            form:{},
            visible: this.$props.visibility
        }
    },
    computed:{
        toggle:{
            get(){
                console.log(this.$props.input)
                return this.$props.input
            },
            set(v){
                console.log(v)
            }
        }
    },
    methods:{
        
    }
}

</script>

<style>
</style>
