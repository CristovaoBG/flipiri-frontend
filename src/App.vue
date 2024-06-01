<script setup>
import { ref } from 'vue';
import MainView from './views/MainView.vue';
import AcitvityVIew from './views/AcitvityVIew.vue';
import AuthorsView from './views/AuthorsView.vue';

const showActivity = ref(false);
const showAuthors = ref(true);
const showHosting = ref(false);

const clear = () => {
  showActivity.value = false;
  showAuthors.value = false;
  showHosting.value = false;
};
</script>



<template>
  <button @click="clear(); showActivity = true">Atividades</button>
  <button @click="clear(); showAuthors = true">Autores</button>
  <button @click="clear(); showHosting = true">Hospedagem</button>
  <div v-if="showActivity"><AcitvityVIew/></div>
  <div v-if="showAuthors"><AuthorsView/></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
