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
            <a @click="edit_item(id)" href="javascript:void(0)">editar</a>
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
        'dictionary', 'table_name'
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
      edit_item(id){
        this.$emit('edit-item', id)
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
  