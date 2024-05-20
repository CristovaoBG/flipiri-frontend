<script setup>
import DisplayClass from './components/DisplayClass.vue';

const dictionary = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'janeple.com' },
          { id: 3, name: 'Sam Johnson', email: 'saxample.com' }
        ]
const URL_BASE = 'http://127.0.0.1:5000/'
</script>

<template>
  <DisplayClass class_name="Feeding"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
