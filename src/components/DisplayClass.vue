<template>
    <div v-if="isLoading">Carregando...</div>
    <SheetViewer v-else 
    :dictionary="value"
    :header="header"
    :tableName="this.class_name"
    :editable="editable"
    :deletable="deletable"/>
  </template>
  
  <script>
  import { URL_BASE } from '../constants';
  import axios from 'axios';
  import SheetViewer from './SheetViewer.vue';
  
  export default {
    props: ['class_name', 'editable', 'deletable'],
    data() {
      return {
        value: [],
        header: [],
        isLoading: true,
      };
    },
    mounted() {
      // pega dicionario
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
      // pega chaves (traducao)
      axios
        .get(URL_BASE + 'get_class_header/', {
          params: {
            class_name: this.class_name,
            language: "pt"
          },
        })
        .then((response) => {
          this.header = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Erro ao fazer a requisição:', error);
        });
    },
    components: { SheetViewer },
  };
  </script>
  
  <style></style>