<template>
  <div v-if="typeof item === 'string'">
    <div v-if="item.includes('ObjectId')">
        ObjectId: {{ item }}
    </div>
    <div v-else>
        String: {{ item }}
    </div>
  </div>
  <div v-else-if="(item instanceof Array)">
    ARRAY<br>
    <div v-for="k in item" :key="k"> 
        Sub-item: {{ k }}
    </div> 
  </div>
  <div v-else>
    Other type: {{ item }}
  </div>
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>