<template>
    {{ value }}
</template>
  
  <script>
  import axios from 'axios';
  import { URL_BASE } from '../constants';
  
  export default {
      props: ['item'],
      data() {
          return {
              value: '',
              isLoading: false
          }
      },
      methods: {
          async getObjId(item) {
              this.isLoading = true;
              try {
                  const response = await axios.get(URL_BASE + 'test/', {
                      params: {
                        _id: item.split('\'')[1], // porque é tipo "ObjectData('valor')"
                      },
                  });
                  this.value += response.data + '\n'; // Atualize o estado diretamente
              } catch (error) {
                  console.error('Erro ao fazer a requisição:', error);
              } finally {
                  this.isLoading = false;
              }
          }
      },
      mounted() {
          if (typeof this.item === 'string' && this.item.includes('ObjectId')) {
              this.getObjId(this.item);
          } else if (Array.isArray(this.item)) {
              this.item.forEach(k => {
                  this.getObjId(k);
              });
          } else {
            this.value = this.item
          }
      },
      watch: {
        item(newVal, oldVal){
            console.log(`Item mudou de "${oldVal}" para "${newVal}"`);
            if (typeof this.item === 'string' && this.item.includes('ObjectId')) {
                this.getObjId(this.item);
            } else if (Array.isArray(this.item)) {
                this.item.forEach(k => {
                    this.getObjId(k);
                });
            } else {
                this.value = this.item
            }
        }
      }
  }
  </script>
  