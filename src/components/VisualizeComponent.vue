<template>
    <SheetViewer v-if="finishedLoading" :dictionary="dictionary" :y-label="yLabel"/>
    <h2 v-else>Carregando...</h2>
</template>

<script setup>
import { ref, defineProps, onMounted, computed, reactive } from 'vue';
import { getStatus } from '../dbInterface';
import SheetViewer from './SheetViewer.vue';

const toggle = ref(false)
const finishedLoading = ref(false)
const dictionary = ref([{}])
const props = defineProps({
  statusLabel: {
    type: String,
    default: ''
  },
  yLabel: {
    type: String,
  }
});

onMounted(() => {
  getStatus(props.statusLabel, (response) => {
    dictionary.value = response.data;
    finishedLoading.value = true;
  });
});


</script>

<style>

</style>