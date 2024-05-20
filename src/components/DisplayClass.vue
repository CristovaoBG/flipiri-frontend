<template>
    <div v-if="isLoading">Carregando...</div>
    <SheetViewer v-else :dictionary="value" :table_name="this.class_name"/>
  </template>
  
  <script>
  const URL_BASE = 'http://127.0.0.1:5000/';
  import axios from 'axios';
  import SheetViewer from './SheetViewer.vue';
  
  export default {
    props: ['class_name'],
    data() {
      return {
        value: null,
        isLoading: true,
      };
    },
    mounted() {
      axios
        .get(URL_BASE + 'get_class/', {
          params: {
            class_name: this.class_name,
          },
        })
        .then((response) => {
          this.value = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Erro ao fazer a requisição:', error);
          this.isLoading = false;
        });
    },
    components: { SheetViewer },
  };
  </script>
  
  <style></style>