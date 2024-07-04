<template>
  <div v-if="loaded">
    <p>Preço da refeição:</p>
    <h2>R${{ mealPrice }}</h2>
    <br>
    <label for="price">Alterar preço da refeição por pessoa:</label> <input type="number" id="price" v-model="formData.price" step="0.01" required class="no-spin">
    <br>
    <button @click.prevent="sendMealPrice">Enviar</button>
  </div>
  <div v-else>carregando...</div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { getMealPrice, setMealPrice } from '../dbInterface';

const mealPrice = ref(0)
const loaded = ref(false)

const formData = ref({
  price: 0
})

onMounted(() => {
    getMealPrice((response) => {
        mealPrice.value = response.data['price']
        formData.value.price = response.data['price']
        loaded.value = true;
    })
})

const sendMealPrice = () => {
  setMealPrice(formData.value,() => {
    getMealPrice((response) => {
        mealPrice.value = response.data['price']
        formData.value.price = response.data['price']
    })
  })
}
</script>

<style>

</style>