<script setup>
import DisplayClass from './components/DisplayClass.vue';
import DisplayClass2 from './components/DisplayClass.vue';

const URL_BASE = 'http://127.0.0.1:5000/'
</script>

<template>
  <DisplayClass class_name="Activity"/>
  <DisplayClass class_name="AgeRange"/>
  <DisplayClass class_name="Authors"/>
  <DisplayClass class_name="Feeding"/>
  <DisplayClass class_name="Hosting"/>
  <DisplayClass class_name="Location"/>
  <DisplayClass class_name="Trip"/>
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
