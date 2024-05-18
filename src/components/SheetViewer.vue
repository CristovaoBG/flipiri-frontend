<template>
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th v-for="k in Object.keys(dictionary[0])" :key="k">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dictionary" :key="item">
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
        'dictionary'
    ],
    data() {
      return {
        dictionar: [
          { i: 1, name: 'John Doe', email: 'john@example.com' },
          { i: 2, name: 'Jane Smith', email: 'janeple.com' },
          { i: 3, name: 'Sam Johnson', email: 'saxample.com' }
        ]
      };
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
  