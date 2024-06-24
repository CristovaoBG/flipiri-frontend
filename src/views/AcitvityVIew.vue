<template>
    <DisplayClass class_name="Activity" 
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
        <label for="date">Data de início:</label> <input type="datetime-local" id="date" v-model="formData.date_start" required>
        <br>
        <label for="duration">Data de término:</label> <input type="datetime-local" id="date" v-model="formData.date_end" required>
        <br>
        <!-- <label for="authors">Autores:</label> <ul><li v-for="auth in authorsList" :key="auth">{{ auth.author }}</li></ul>> -->
        <form @submit.prevent="submitAuthor">
          Autores: <p v-show="formData.authors.length === 0"> Nenhum autor</p>
          <div v-for="value, key in formData.authors" :key="key">- {{ value.name }}<a @click.prevent="removeAuthor(value)" href="javascript:void(0)"> remover</a> </div>
          <select v-model="selectedAuth">
            <option v-for="auth in authorList.value" :key="auth._id" :value="auth">{{ auth.name }}</option>
          </select>
          <input type="submit" value="Enviar">
        </form>
        <br>
        <label for="responsible_author">Autor Responsável: </label>
        <form @submit.prevent="submitAuthor">
          <select v-model="formData.responsible_author">
            <option v-for="auth in authorList.value" :key="auth._id" :value="auth">{{ auth.name }}</option>
          </select>
        </form>
        <br>
        <label for="location">Localização (ID):</label>
        <form @submit.prevent="submitAuthor">
          <select v-model="formData.location">
            <option v-for="loc in locationList.value" :key="loc._id" :value="loc">{{ loc.name }}</option>
          </select>
        </form>
        <br>
        <label for="age_range">Idade mínima:</label> <input type="number" id="age_range" v-model="formData.age_range_start" required>
        <label for="age_range2">Idade máxima:</label> <input type="number" id="age_range2" v-model="formData.age_range_end" required>
        <br>
        <label for="category">Categoria:</label> <input type="text" id="category" v-model="formData.category" required>
        <br><br>
        <button type="submit" id="add-author-btn">Enviar</button>
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
  date_start: '',
  date_end: '',
  authors: [],
  responsible_author: null,
  location: '',
  age_range_start: '',
  age_range_end: 0,
  category: ''
});

const selectedAuth = ref('')
const authorList = reactive({});
const locationList = reactive({});
const displayClassKey = ref(0);
const formMode = ref('')
const showEditActivity = ref(false)
const showNewActivity = ref(false)

onMounted(() => {
  getClassAndFormat('Authors', authorList, "name");
  getClassAndFormat('Location', locationList, "name");
})

const handleSubmit = () => {
  const data_type = showEditActivity.value? "edition" : "new_entry"
  const data = {type: data_type, value: formData.value}
  if (formData.value.authors.length === 0){
    alert("Não há nenhum autor na atividade.")
    return
  }
  postData('add_activity/', data, (response) => {
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
  formData.value.authors.splice(obj,1)
}


const submitAuthor = () => {
  if (!selectedAuth.value) return;
  // veja se ja ta incluso
  for (let auth of formData.value.authors){
    if (selectedAuth.value.name === auth.name) return;
  }
  formData.value.authors.push(selectedAuth.value)
}

const newActivity = () => {
  formData.value = {
    _id: -1,
    name: '',
    date_start: '',
    date_end: '',
    authors: [],
    responsible_author: null,
    location: '',
    age_range_start: '',
    age_range_end: 0,
    category: ''
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
    const date_start = new Date(item.date_start).toISOString().slice(0, 16);
    const date_end = new Date(item.date_end).toISOString().slice(0, 16);
    
    formData.value = {
      _id: item._id.split("'")[1],
      name: item.name,
      date_start: date_start,
      date_end: date_end,
      authors: [],
      responsible_author: "",
      location: "",
      age_range_start: item.age_range_start,
      age_range_end: item.age_range_end,
      category: item.category
    };
    // formatar lista de autores
    for(let author of item.authors){
      console.log(author)
      let str_id = author.split("'")[1]
      getItemFromId(str_id, (response) => {
        let auth = {"name": response.data.name, "_id": response.data._id.split("'")[1]}
        formData.value.authors.push(auth)
      })
    }
        // autor responsavel
    getItemFromId(item.responsible_author.split("'")[1], (response) => {
      formData.value.responsible_author = {"name": response.data.name, "_id": response.data._id.split("'")[1]}
    });
    // localizacao
    getItemFromId(item.location.split("'")[1], (response) => {
      formData.value.location = {"name": response.data.name, "_id": response.data._id.split("'")[1]}
    });
  });
};

</script>

<style scoped>
form, h2 {
  text-align: left;
}

</style>
