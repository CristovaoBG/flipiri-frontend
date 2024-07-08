<template>
    <p v-html="parseIfDate(value)"></p>
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
        parseIfDate(input) {
            // Converte pra data, se for data, se nao deixa
            if(typeof input !== 'string') return input
            const datePattern = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
            if (!input.match(datePattern)) return input; 
            let date = new Date(input);
            if (isNaN(date)) return input; 
            let day = date.getUTCDate().toString().padStart(2, '0');
            let month = (date.getUTCMonth()+1).toString().padStart(2, '0'); // (0->11) +1
            let year = date.getFullYear().toString().padStart(2, '0');
            let hour = date.getUTCHours()
            let minutes = date.getUTCMinutes().toString().padStart(2, '0');
            minutes = minutes == '00'? '': minutes
            return `${day}/${month}/${year}<br>${hour}h${minutes}`;
        },
        async getObjId(item) {
            this.isLoading = true;
            try {
                const response = await axios.get(URL_BASE + 'test/', {
                    params: {
                    _id: item.split('\'')[1], // porque é tipo "ObjectData('valor')"
                    },
                });
            if (this.value === ''){
                this.value = response.data
                }
            else{
                this.value += "<hr color=\"#383838\">" + response.data
                }
                //this.value += response.data + ', <br>'; // Atualize o estado diretamente
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
  