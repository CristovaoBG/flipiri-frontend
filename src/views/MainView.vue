<script setup>
import DisplayClass from '../components/DisplayClass.vue';
</script>

<template>
  <DisplayClass v-show="showActivity" class_name="Activity"/>
  <!-- <DisplayClass class_name="AgeRange"/> -->
  <DisplayClass v-show="showAuthors" class_name="Authors"/>
  <!-- <DisplayClass class_name="Feeding"/> -->
  <DisplayClass v-show="showHosting" class_name="Hosting"/>
  <!-- <DisplayClass class_name="Location"/> -->
  <!-- <DisplayClass class_name="Trip"/> -->
  <br><br><br><hr><br><br><br>
  teste
</template>

<script>

export default {
    props: ['showActivity', 'showAuthors', 'showHosting'],
  };


</script>