<script setup>
defineProps({
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
   <td v-for="column in columns">
     {{ typeof column === "function" ? column(row) : row[column] }}
   </td>
  </tr>
</tbody>
</template>

<style scoped>

</style>