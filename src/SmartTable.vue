<script setup>
import SmartTableHeader from "@/components/SmartTable/src/SmartTableHeader.vue";
import SmartTableBody from "@/components/SmartTable/src/SmartTableBody.vue";
import './assets/css/style.css';
import {computed} from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  caption: {
    type: String
  }
})

/**
 * Computed property of columns name's
 * @type {ComputedRef<(string|*)[]|[]>}
 */
const columnsNames = computed(() => {
  if (!!props.columns) {
    return props.columns.map((column) => column.field);
  } else {
    return [];
  }
});

</script>

<template>
  <table class="smart-table">
    <caption v-if="caption">{{ caption }}</caption>
    <smart-table-header :columns="columns"/>
    <smart-table-body :rows="rows" :columns="columnsNames"/>
  </table>
</template>

<style scoped>

</style>