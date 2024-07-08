<script setup>
import { ref } from 'vue';
import AcitvityVIew from './views/AcitvityVIew.vue';
import AuthorsView from './views/AuthorsView.vue';
import HostingView from './views/HostingView.vue';
import LocationView from './views/LocationsView.vue';
import TravelView from './views/TravelView.vue';
import CategoryView from './views/CategoryView.vue';
import MealPriceView from './views/MealPriceView.vue';
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
    'Custos Adicionais': AditionalCostsView,
    'Categorias': CategoryView,
    'Preço da Refeição': MealPriceView
    
  }
)

const visualizeStatusList = ref(
  {
    'Ativdade por autores': ['activity_by_author','Autor'],
    'Atividade por Local': ['activity_by_location','Localização'],
    'Detalhes dos Autores': ['author_details','Autor'],
    'Total de custos': ['total_costs', 'Nome'],
    'Custo das atividades': ['activity_costs', 'Nome']
  }
)

const displayClassKey = ref(0)

const currentKey = ref('Ativdade por autores')

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
    <button v-for="k in Object.keys(visualizeStatusList)"
      :key="k"
      @click.prevent="() => {currentKey = k; displayClassKey+=1} ">{{ k }}
    </button>
    <VisualizeComponent
      :status-label="visualizeStatusList[currentKey][0]"
      :y-label="visualizeStatusList[currentKey][1]"
      :key="displayClassKey"
      :table-name="currentKey"
      />
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

