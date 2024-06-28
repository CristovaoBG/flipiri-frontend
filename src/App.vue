<script setup>
import { ref } from 'vue';
import AcitvityVIew from './views/AcitvityVIew.vue';
import AuthorsView from './views/AuthorsView.vue';
import HostingView from './views/HostingView.vue';
import LocationView from './views/LocationsView.vue';
import TravelView from './views/TravelView.vue';
import VisualizeComponent from './components/VisualizeComponent.vue';

const showActivity = ref(false);
const showAuthors = ref(true);
const showHosting = ref(false);
const showLocation = ref(false);
const showTravel = ref(false);
const editionTablesMode = ref(false);

const clear = () => {
  showActivity.value = false;
  showAuthors.value = false;
  showHosting.value = false;
  showLocation.value = false;
  showTravel.value = false;
};

const toggleMode = () => {
  editionTablesMode.value = !editionTablesMode.value
}
</script>

<template>
  <button :class="{ active: editionTablesMode}" @click.prevent="toggleMode">EDIÇÂO</button>
  <button :class="{ active: !editionTablesMode}" @click.prevent="toggleMode">VISUALIZAÇÂO</button>
  <br><br>
  <div v-if="editionTablesMode">
    <button @click="clear(); showActivity = true">Atividades</button>
    <button @click="clear(); showAuthors = true">Autores</button>
    <button @click="clear(); showHosting = true">Hospedagem</button>
    <button @click="clear(); showLocation = true">Localizações</button>
    <button @click="clear(); showTravel = true">Viagem</button>
    <div v-if="showActivity"><AcitvityVIew/></div>
    <div v-if="showAuthors"><AuthorsView/></div>
    <div v-if="showHosting"><HostingView/></div>
    <div v-if="showLocation"><LocationView/></div>
    <div v-if="showTravel"><TravelView/></div>
  </div>
  <div v-else>
    <VisualizeComponent :status-label="'activity_by_location'" :y-label="'location'"/><br>
    <VisualizeComponent :status-label="'activity_by_author'" :y-label="'author'"/><br>
  </div>

</template>

<style scoped>

.active {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.1s, box-shadow 0.1s;
}
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

