<script setup>
const props = defineProps({
  sortType: {
    type: String,
    default: 'none'
  }
})
</script>

<template>
  <span v-if="props.sortType === 'asc'">&uarr;</span>
  <span v-else-if="props.sortType === 'desc'">&darr;</span>
</template>

<style scoped>

</style>