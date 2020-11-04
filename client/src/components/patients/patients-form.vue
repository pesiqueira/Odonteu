<template>
  <b-modal v-model="modalVisible" size="xl" ref="patient-form" hide-footer title="Novo Paciente">
    <b-form @submit="createPatient" >
      <b-tabs>
        <b-tab title="Informações Básicas">
          <b-row>
            <b-col cols="9">
              <b-form-group id="input-group-name" label="* Nome Completo" label-for="input-name" description="Nome completo do paciente">
                <b-form-input id="input-name" v-model="form.name" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group id="input-group-cellphone" label="* Celular" label-for="input-cellphone" description="Celular com código de DDD">
                <b-form-input id="input-cellphone" v-model="form.cellphone" required ></b-form-input>
              </b-form-group>
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
            <b-col>
              <b-form-group id="input-group-nascimento" label="* Data de Nascimento" label-for="input-nascimento">
                <b-form-datepicker id="input-born-at" v-model="form.bornAt" class="mb-2" required :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-genero" label="* Gênero" label-for="input-genero">
                <b-form-radio-group id="radio-group-gender" v-model="form.gender" required>
                  <b-form-radio value="Male">Masculino</b-form-radio>
                  <b-form-radio value="Female">Feminino</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="input-group-obs" label="Observações" label-for="input-obs">
                <b-form-textarea id="input-obs" v-model="form.obs" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Informações Complementares">
          <b-row>
            <b-col>
              <b-form-group id="input-group-email" label="Email" label-for="input-email" description="Email completo: example@example.com.br">
                <b-form-input id="input-email" v-model="form.email"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-tel" label="Telefone Fixo" label-for="input-tel" description="Telefone com código de DDD">
                <b-form-input id="input-tel" v-model="form.tel"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="2">
              <b-form-group id="input-group-cep" label="CEP" label-for="input-cep">
                <b-form-input id="input-cep" v-model="form.cep"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-address" label="Endereço" label-for="input-address">
                <b-form-input id="input-address" v-model="form.address"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="input-group-neighbour" label="Bairro" label-for="input-neighbour">
                <b-form-input id="input-neighbour" v-model="form.neighbour"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="2">
              <b-form-group id="input-group-complement" label="Complemento" label-for="input-complement" description="Exemplo: Casa 10, AP 702">
                <b-form-input id="input-complement" v-model="form.complement"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-city" label="Cidade" label-for="input-city">
                <b-form-input id="input-city" v-model="form.city"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-state" label="Estado" label-for="input-state">
                <b-form-input id="input-state" v-model="form.state"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <h6> Informações do Responsável </h6>
          <b-row class="mt-2">
            <b-col>
              <b-form-group id="input-group-resp-name" label="Nome" label-for="input-resp-name">
                <b-form-input id="input-resp-name" v-model="form.respName"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group id="input-group-resp-born-at" label="Data de Nascimento" label-for="input-resp-born-at">
                <b-form-datepicker id="input-resp-born-at" v-model="form.respBornAt" class="mb-2" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group id="input-group-resp-cpf" label="CPF" label-for="input-resp-cpf">
                <b-form-input id="input-resp-cpf" v-model="form.respCpf"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Convênio">
          <b-row>
            <b-col>
              <b-form-group id="input-group-insurance" label="Convênio" label-for="input-insurance">
                <b-form-input id="input-insurance" v-model="form.insurance" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-insurance-number" label="Número da Carteirinha" label-for="input-insurance-number">
                <b-form-input id="input-insurance" v-model="form.insuranceNumber" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="input-group-insurance-owner" label="Titular da Carteirinha" label-for="input-insurance-owner" description="Nome Completo">
                <b-form-input id="input-insurance-owner" v-model="form.insuranceOwner" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-insurance-owner-cpf" label="CPF do Responsavel" label-for="input-insurance-owner-cpf">
                <b-form-input id="input-insurance-owner-cpf" v-model="form.insuranceOwnerCpf" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    
      <b-row align-h="between">
        <b-col cols="2">
          <b-button type="cancel" @click="toggleForm" variant="outline-primary">Fechar</b-button>
        </b-col>
        <b-col cols="3" class="align-right">
          <b-button type="submit" variant="primary">Cadastrar Paciente</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import EventBus from '../event-bus.vue'
import axios from 'axios';

export default {
  name: 'PatientsForm',
  data(){
    return {
      form:{},
      modalVisible:false
    }
  },
  components:{

  },
  mounted() {
    let v = this;
    if(v.$refs['patient-form'])
      EventBus.$on('TOGGLE_PATIENT_FORM',()=>{
        v.toggleForm();
      })
  },
  methods:{
    createPatient(e){
      let v = this;
      e.preventDefault();
      axios.post('http://localhost:1607/api/patient',this.form).then(({status,data})=>{
        if(status==200)
          v.toggleForm()
        else
          console.log(data)
      }).catch(err=>console.log(err));
    },
    toggleForm(){
      this.modalVisible = !this.modalVisible;
    }
  }
}

</script>

<style>
.align-right{
  text-align:right;
}
</style>
