<template>
    <SheetViewer :dictionary="dictionary" :y-label="yLabel"/>
</template>

<script setup>
import { ref, defineProps, onMounted, computed, reactive } from 'vue';
import { getStatus } from '../dbInterface';
import SheetViewer from './SheetViewer.vue';

const toggle = ref(false)

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
  });
});


</script>

<style>

</style>