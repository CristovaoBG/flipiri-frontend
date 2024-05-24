<template>
    <DisplayClass class_name="Activity"/>
    <h2>Nova atividade</h2>
    <form @submit.prevent="handleSubmit">
      <label for="name">Nome:</label><input type="text" id="name" v-model="formData.name" required>
      <br>
      <label for="date">Data:</label> <input type="datetime-local" id="date" v-model="formData.date" required>
      <br>
      <label for="duration">Duração:</label> <input type="text" id="duration" v-model="formData.duration" required>
      <br>
      <!-- <label for="authors">Autores:</label> <ul><li v-for="auth in authorsList" :key="auth">{{ auth.author }}</li></ul>> -->
      <label for="authors">Autores:</label> 
      <form @submit.prevent="submitAuthor">
        <select v-model="selectedAuth">
          <option v-for="auth in authorList.value" :key="auth.id" :value="auth">{{ auth.name }}</option>
        </select>
        <input type="submit" value="Enviar">
      </form>
      selecionados: <div v-for="value, key in formData.authors" :key="key">-{{ value.name }}</div>
      <br>
      <label for="responsible_author">Autor Responsável: </label>
      <form @submit.prevent="submitAuthor">
        <select v-model="formData.responsibleAuthor">
          <option v-for="auth in authorList.value" :key="auth.id" :value="auth">{{ auth.name }}</option>
        </select>
      </form>
      <br>
      <label for="location">Localização (ID):</label> <input type="text" id="location" v-model="formData.location" required>
      <br>
      <label for="age_range">Faixa Etária (ID):</label> <input type="text" id="age_range" v-model="formData.age_range" required>
      <br>
      <label for="category">Categoria:</label> <input type="text" id="category" v-model="formData.category" required>
      <br><br>
      <button type="submit">Enviar</button>
      <label for="author-select">Selecione um autor:</label>

<button id="add-author-btn">Adicionar Autor</button>

<div v-for="(value, key) in formData" :key="key">
      - {{ key }}: {{ value }}
    </div>

<div id="selected-authors">
  debug: {{ authorList.value }}
  <!-- Aqui é onde os autores selecionados serão exibidos -->
</div>

  </form>
</template>

<script setup>
import DisplayClass from '../components/DisplayClass.vue';
import { ref, onMounted, computed, reactive } from 'vue';
import { getClass, getClassAndFormat } from '../dbInterface';

// Definindo o estado do formulário
const formData = ref({
  name: '',
  date: '',
  duration: '',
  authors: [],
  responsibleAuthor: null,
  location: '',
  ageRange: '',
  category: ''
});

const selectedAuth = ref('')
const authorList = reactive({});

onMounted(() => { getClassAndFormat('Authors', authorList, "name");})

const handleSubmit = () => {
  const data = formData.value;
  console.log(data);
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