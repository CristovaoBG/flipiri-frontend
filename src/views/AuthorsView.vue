<template>
  <DisplayClass class_name="Authors" 
  :key="displayClassKey" 
  @edit-item="editItem" 
  :editable="true"
  @delete-item="deleteItem"
  :deletable="true"
  />
  <!-- botao de nova atividade -->
  <button v-if="!showEditActivity && !showNewActivity" type="submit" @click="newActivity">Nova Atividade</button>

  <div v-show="showNewActivity || showEditActivity ">
    <h2>{{ formMode }}</h2>
    <form @submit.prevent="handleSubmit">
      <label for="name">Nome:</label><input type="text" id="name" v-model="formData.name" required>
      <br>
      <label for="name">Sexo:</label><input type="text" id="sex" v-model="formData.sex" required>
      <br>
      <label for="date">Chegada:</label> <input type="datetime-local" id="date" v-model="formData.arrival" required>
      <br>
      <label for="duration">Partida:</label> <input type="datetime-local" id="date" v-model="formData.departure" required>
      <br><br>
      <button type="submit" id="send_form">Enviar</button>
      <button @click.prevent="cancelSubmission">Cancelar</button>
      <!-- <div v-for="(value, key) in formData" :key="key">
        - {{ key }}: {{ value }}
      </div> -->
  </form>
</div>
</template>

<script setup>
import DisplayClass from '../components/DisplayClass.vue';
import { ref, onMounted, computed, reactive } from 'vue';
import { getClass, getClassAndFormat, postData, getItemFromId } from '../dbInterface';

// Definindo o estado do formulário
const formData = ref({
  name: '',
  sex: '',
  arrival: null,
  departure: null
});

const displayClassKey = ref(0);
const formMode = ref('')
const showEditActivity = ref(false)
const showNewActivity = ref(false)

const handleSubmit = () => {
  const data_type = showEditActivity.value? "edition" : "new_entry"
  const data = {type: data_type, value: formData.value}
  postData('add_author/', data, (response) => {
    if (response.data.success){
      displayClassKey.value += 1
      showNewActivity.value = false 
      showEditActivity.value = false
    }
    else {
      alert(response.data.error_msg)
    }
  })
};

const cancelSubmission = () => {
  if(!confirm("Clique 'Ok' para confirmar ação.")) return
  showNewActivity.value = false 
  showEditActivity.value = false
}

const newActivity = () => {
  formData.value = {
    name: '',
    sex: '',
    arrival: null,
    departure: null
  }
  formMode.value = "Nova Atividade"
  showEditActivity.value = false
  showNewActivity.value = true
}

const deleteItem = (itemId) => {
if(showNewActivity.value || showEditActivity.value) {
  alert("Há uma operação em andamento. Cancele-a para continuar.")
  return
}
console.log("deletar item " + itemId )
if(!confirm("Deseja deletar item?")) return
postData('delete_entry/', {_id: itemId}, (response) => {
  if (response.data.success){
    displayClassKey.value += 1
  }
  else {
    alert(response.data.error_msg)
  }
  console.log(response)
})
}

const editItem = (item_id) => {
  // habilitar formulario de edição
  showEditActivity.value = true
  showNewActivity.value = false
  formMode.value = "Edição de Atividade"
  getItemFromId(item_id, (response) => {
    const item = response.data;
    // formatar datas
    const arrival = new Date(item.arrival).toISOString().slice(0, 16);
    const departure = new Date(item.departure).toISOString().slice(0, 16);
    
    formData.value = {
      _id: item._id.split("'")[1],
      name: item.name,
      sex: item.sex,
      arrival: arrival,
      departure: departure,
    };
  });
};

</script>

<style scoped>
form, h2 {
  text-align: left;
}

</style>
