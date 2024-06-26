<template>
  <DisplayClass class_name="Trip" 
  :key="displayClassKey" 
  @edit-item="editItem" 
  :editable="true"
  @delete-item="deleteItem"
  :deletable="true"
  />
  <!-- botao de nova atividade -->
  <button v-if="!showEditActivity && !showNewActivity" type="submit" @click="newActivity">Nova Viagem</button>
  <div v-show="showNewActivity || showEditActivity ">
    <h2>{{ formMode }}</h2>
    <form @submit.prevent="handleSubmit">
      <label for="origin">Origem: </label><input type="text" id="origin" v-model="formData.origin" required>
      <br>
      <label for="name">Destino: </label><input type="text" id="name" v-model="formData.destiny" required>
      <br>
      <label for="date">Data de partida:</label> <input type="datetime-local" id="date" v-model="formData.date" required>
      <br>
      <label for="name">Tipo de transporte: </label><input type="text" id="name" v-model="formData.transportation_type" placeholder="carro" required>
      <br>
      <br>
      <label for="price">Preço: </label> <input type="number" id="price" v-model="formData.price" step="0.01" required class="no-spin">
      <form @submit.prevent="submitAuthor">
        Passageiros: <p v-show="formData.passenger_list.length === 0"> Nenhum passageiro</p>
        <div v-for="value, key in formData.passenger_list" :key="key">- {{ value.name }}<a @click.prevent="removeAuthor(value)" href="javascript:void(0)"> remover</a> </div>
        <select v-model="selectedAuth">
          <option v-for="auth in authorList.value" :key="auth._id" :value="auth">{{ auth.name }}</option>
        </select>
        <input type="submit" value="Enviar">
      </form>
      <br>
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
  origin: '',
  destiny: '',
  date: null,
  transportation_type: '',
  price: 0.0,
  passenger_list: []
});

const selectedAuth = ref('')
const authorList = reactive({});
const displayClassKey = ref(0);
const formMode = ref('')
const showEditActivity = ref(false)
const showNewActivity = ref(false)

onMounted(() => {
  getClassAndFormat('Authors', authorList, "name");
  console.log("ok here")
})

const handleSubmit = () => {
  const data_type = showEditActivity.value? "edition" : "new_entry"
  const data = {type: data_type, value: formData.value}
  if (formData.value.passenger_list.length === 0){
    alert("Não há nenhum passageiro na viagem.")
    return
  }
  postData('add_trip/', data, (response) => {
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

const removeAuthor = (obj) => {
  const id = formData.value.passenger_list.indexOf(obj)
  formData.value.passenger_list.splice(id,1)
}

const submitAuthor = () => {
if (!selectedAuth.value) return;
// veja se ja ta incluso
for (let auth of formData.value.passenger_list){
  if (selectedAuth.value.name === auth.name) return;
}
formData.value.passenger_list.push(selectedAuth.value)
}

const newActivity = () => {
  formData.value = {
    _id: -1,
    origin: '',
    destiny: '',
    date: null,
    transportation_type: '',
    price: 0.0,
    passenger_list: []
  }
  formMode.value = "Nova Viagem"
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
  formMode.value = "Edição de Localização"
  getItemFromId(item_id, (response) => {
    const item = response.data;// formatar datas
    const date = new Date(item.date).toISOString().slice(0, 16);
    formData.value = {
      _id: item._id.split("'")[1],
      origin: item.origin,
      destiny: item.destiny,
      date: date,
      transportation_type: item.transportation_type,
      price: item.price,
      passenger_list: []
    };
    // formatar lista de autores
    for(let author of item.passenger_list){
      console.log(author)
      let str_id = author.split("'")[1]
      getItemFromId(str_id, (response) => {
        let auth = {"name": response.data.name, "_id": response.data._id.split("'")[1]}
        formData.value.passenger_list.push(auth)
      })
    } 
  });
};

</script>

<style scoped>
form, h2 {
  text-align: left;
}

</style>
