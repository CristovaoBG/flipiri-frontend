<template>
    <DisplayClass class_name="Authors"/>
    <h2>Novo Autor</h2>
    <form>
      <label for="name">Nome:</label><input type="text" id="name" v-model="formData.name" required>
      <br>
      <label for="date">Data de início:</label> <input type="datetime-local" id="date" v-model="formData.date_start" required>
      <br>
      <label for="duration">Data de término:</label> <input type="datetime-local" id="date" v-model="formData.date_end" required>
      <br>
      <!-- <label for="authors">Autores:</label> <ul><li v-for="auth in authorsList" :key="auth">{{ auth.author }}</li></ul>> -->
      <form @submit.prevent="submitAuthor">
        Autores:
        <div v-for="value, key in formData.authors" :key="key">-{{ value.name }}</div>
        <select v-model="selectedAuth">
          <option v-for="auth in authorList.value" :key="auth.id" :value="auth">{{ auth.name }}</option>
        </select>
        <input type="submit" value="Enviar">
      </form>
      <br>
      <label for="responsible_author">Autor Responsável: </label>
      <form @submit.prevent="submitAuthor">
        <select v-model="formData.responsible_author">
          <option v-for="auth in authorList.value" :key="auth.id" :value="auth">{{ auth.name }}</option>
        </select>
      </form>
      <br>
      <label for="location">Localização (ID):</label>
      <form @submit.prevent="submitAuthor">
        <select v-model="formData.location">
          <option v-for="loc in locationList.value" :key="loc.id" :value="loc">{{ loc.name }}</option>
        </select>
      </form>
      <br>
      <label for="age_range">Idade mínima:</label> <input type="number" id="age_range" v-model="formData.age_range_start" required>
      <label for="age_range2">Idade máxima:</label> <input type="number" id="age_range2" v-model="formData.age_range_end" required>
      <br>
      <label for="category">Categoria:</label> <input type="text" id="category" v-model="formData.category" required>
      <br><br>
      <button type="submit" @click.prevent="handleSubmit">Enviar</button>
      <label for="author-select">Selecione um autor:</label>

<button id="add-author-btn">Adicionar Autor</button>

<div v-for="(value, key) in formData" :key="key">
      - {{ key }}: {{ value }}
    </div>

<div id="selected-authors">
  debug: {{ locationList.value }}
  <!-- Aqui é onde os autores selecionados serão exibidos -->
</div>

  </form>
</template>

<script setup>
import DisplayClass from '../components/DisplayClass.vue';
import { ref, onMounted, computed, reactive } from 'vue';
import { getClass, getClassAndFormat, postData } from '../dbInterface';

// Definindo o estado do formulário
const formData = ref({
  name: '',
  date_start: '',
  date_end: '',
  authors: [],
  responsible_author: null,
  location: '',
  age_range_start: '',
  age_range_end: '',
  category: ''
});

const selectedAuth = ref('')
const authorList = reactive({});
const locationList = reactive({});

onMounted(() => {
  getClassAndFormat('Authors', authorList, "name");
  getClassAndFormat('Location', locationList, "name");
})

const handleSubmit = () => {
  const data = formData.value;
  postData('add_author/', data, (response) => {
    console.log(response)
  })
};

const submitAuthor = () => {
  if (selectedAuth.value && !formData.value.authors.includes(selectedAuth.value)) {
    formData.value.authors.push(selectedAuth.value)
  }
}


</script>

<style scoped>
form, h2 {
  text-align: left;
}

</style>