<template>
    <b-modal size="xl" ref="patient-form" hide-footer title="Novo Paciente">
    <b-form class="mt-2">
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
                <b-form-input id="input-nascimento" v-model="form.bornAt" required ></b-form-input>
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
                <b-form-group id="input-group-obs" label="* Observações" label-for="input-obs">
                <b-form-textarea id="input-obs" v-model="form.obs" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
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
import List from '../components/patients/patients-list.vue'
export default {
  name: 'App',
  components:{
      List
  }
}

</script>

<style>
</style>
