<template>
    <div>
      <h2>Tabela {{ table_name }}</h2>
      <table>
        <thead>
          <tr>
            <th v-for="k in Object.keys(display_dictionary[0])" :key="k">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in display_dictionary" :key="item">
            <td v-for="k in Object.keys(item)" :key="k"> {{ item[k] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  export default {
    name: 'UserTable',
    props:[
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
      display_dictionary(){
        return Object.values(this.dictionary)
      }
    }
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
  