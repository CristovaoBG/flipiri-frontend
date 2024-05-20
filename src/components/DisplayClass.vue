<template>
    <SheetViewer :dictionary="value"/>
  </template>
  
  <script>
  const URL_BASE = 'http://127.0.0.1:5000/';
  import axios from 'axios';
  import SheetViewer from './SheetViewer.vue';
 
  export default {
    props:[
        'class_name'
    ],
    data() {
        return {
            value: "",
        };
    },
    created() {
        axios.get(URL_BASE + 'get_class/', {
            params: {
                "class_name": "Feeding"
            }
        }).then(response => {
            this.value = response.data;
            console.log('OKEYY')
            console.log(this.value)
        }).catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            console.log("okasdasd");
        });
    },
    components: { SheetViewer }
}
  </script>
  
  <style>
  </style>
  