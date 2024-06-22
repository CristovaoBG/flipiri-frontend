<template>
    <div>
      <h2>Tabela {{ table_name }}</h2>
      <table>
        <thead>
          <tr>
            <th v-for="k in keys" :key="k">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="id in Object.keys(dictionary)" :key="id">
            <td v-for="k in Object.keys(dictionary[id])" :key="k"> 
              <ItemDisplayer :item="dictionary[id][k]"/>
            </td>
            <a v-show="editable" @click="editItem(id)" href="javascript:void(0)">editar</a>
            <br><a v-show="deletable" @click="deleteItem(id)" href="javascript:void(0)">deletar</a>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import ItemDisplayer from './ItemDisplayer.vue';
  export default {
    name: 'UserTable',
    props: [
        'dictionary', 'table_name', 'editable', 'deletable'
    ],
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
            return Object.keys(Object.values(this.dictionary)[0]);
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
  }
  </style>
  