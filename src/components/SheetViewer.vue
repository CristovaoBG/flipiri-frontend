<template>
      <h2>{{ header.class_name !== ''? 'Tabela ' + header.class_name : tableName }}</h2>
      <table>
        <thead>
          <tr>
            <th
            v-for="k in keys"
            :key="k"
            @click.prevent="(e) => {console.log(e)}">
              {{ header.language? header.translation[k]:k }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="id in Object.keys(dictionary)" :key="id">
            <td v-for="k in keys" :key="k" :style="k==yLabel?'background-color:#614242 ;':''"> 
              <ItemDisplayer :item="dictionary[id][k]"/>
            </td>
            <a v-show="editable" @click="editItem(id)" href="javascript:void(0)">editar</a>
            <br><a v-show="deletable" @click="deleteItem(id)" href="javascript:void(0)">deletar</a>
          </tr>
        </tbody>
      </table>
  </template>

  <script>
import ItemDisplayer from './ItemDisplayer.vue';
  export default {
    name: 'UserTable',
    props: {
      dictionary: {
        type: Object,
        default: [{}]
      },
      tableName: {
        type: String,
        default: 'TABELA'
      },
      editable: {
        type: Boolean,
        default: false
      },
      deletable: {
        type: Boolean,
        default: false
      },
      yLabel: {
        type: String,
        default: ""
      },
      header: {
        type: Object,
        default: {
          translation: {},
          order: [],
          language: null,
          class_name: ''
        }
      }
    },
    data() {
        return {
            dictionar: [
                { i: 1, name: 'John Doe', email: 'john@example.com' },
                { i: 2, name: 'Jane Smith', email: 'janeple.com' },
                { i: 3, name: 'Sam Johnson', email: 'saxample.com' }
            ]
        };
    },
    computed: {
      keys() {
        let ks = Object.keys(Object.values(this.dictionary)[0])
        if (this.yLabel !== "") { //TODO isso aqui ta obsoleto
          const id = ks.indexOf(this.yLabel);
          if (id >=0) { // Verifica se y_label está presente em ks
            ks.splice(id, 1); // Remove y_label de ks
          }
          ks = [this.yLabel, ...ks]
          return ks;
        }
        if(this.header.order){
          return this.header.order
        }
      }
    },
    methods: {
      editItem(id){
        this.$emit('edit-item', id)
      },
      deleteItem(id){
        this.$emit('delete-item', id)
      }
    },
    components: { ItemDisplayer }
};
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #9b3f3f;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  </style>
  