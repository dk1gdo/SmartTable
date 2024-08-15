<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
})
</script>

<template>
<tbody>
 <tr v-for="row in rows">
   <td v-for="column in columns">{{ row[column] }}</td>

<!--    <td v-for="cell in row">{{ cell }}</td>-->
  </tr>
</tbody>
</template>

<style scoped>

</style>