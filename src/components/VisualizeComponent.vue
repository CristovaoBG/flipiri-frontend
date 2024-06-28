<template>
  <SheetViewer :dictionary="dictionary" :y_label="'author'"/>
</template>

<script setup>
import { ref, defineProps, onMounted, computed, reactive } from 'vue';
import { getStatus } from '../dbInterface';
import SheetViewer from './SheetViewer.vue';

const dictionary = ref([{}])
const props = defineProps({
    statusLabel: String
})

getStatus(props.statusLabel, (response) => {
        dictionary.value = response.data
    })

onMounted(() => {
    //dictionary.value = {asd: "uga"}
    
})


</script>

<style>

</style>