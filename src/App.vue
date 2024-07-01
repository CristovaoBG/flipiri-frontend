<script setup>
import { ref } from 'vue';
import AcitvityVIew from './views/AcitvityVIew.vue';
import AuthorsView from './views/AuthorsView.vue';
import HostingView from './views/HostingView.vue';
import LocationView from './views/LocationsView.vue';
import TravelView from './views/TravelView.vue';
import AditionalCostsView from './views/AditionalCostsView.vue';
import VisualizeComponent from './components/VisualizeComponent.vue';

const editionTablesMode = ref(false);

const currentEditComponent = ref(AuthorsView)
const editComponents = ref(
  {
    'Atividades': AcitvityVIew,
    'Autores': AuthorsView,
    'Hospedagens': HostingView,
    'Localizações': LocationView,
    'Viagens': TravelView,
    'Custos Adicionais': AditionalCostsView
  }
)

const visualizeStatusList = ref(
  {
    'Ativdade por autores': ['activity_by_author','author'],
    'Atividade por Local': ['activity_by_location','location'],
    'Viagem por Autor': ['trip_by_author','author']
  }
)

const displayClassKey = ref(0)

const currentVisualizeStatus = ref(visualizeStatusList.value['Ativdade por autores'])

const toggleMode = () => {
  editionTablesMode.value = !editionTablesMode.value
}
</script>

<template>
  <button :class="{ active: editionTablesMode}" @click.prevent="toggleMode">EDIÇÂO</button>
  <button :class="{ active: !editionTablesMode}" @click.prevent="toggleMode">VISUALIZAÇÂO</button>
  <br><br>
  <div v-if="editionTablesMode">
    <button v-for="id in Object.keys(editComponents)"
      :key="id"
      @click.prevent="() => {currentEditComponent = editComponents[id]}">{{ id }}
    </button>
    <br>
    <component :is="currentEditComponent"/>
  </div>
  <div v-else>
    <button v-for="id in Object.keys(visualizeStatusList)"
      :key="id"
      @click.prevent="() => {currentVisualizeStatus = visualizeStatusList[id]; displayClassKey+=1} ">{{ id }}
    </button>
    <VisualizeComponent :status-label="currentVisualizeStatus[0]" :y-label="currentVisualizeStatus[1]" :key="displayClassKey"/>
    <!-- <VisualizeComponent :status-label="'activity_by_location'" :y-label="'location'"/><br>
    <VisualizeComponent :status-label="'activity_by_author'" :y-label="'author'"/><br> -->
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

