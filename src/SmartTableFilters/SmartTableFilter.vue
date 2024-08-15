<script setup>
import {ref} from "vue";
import SmartTableFilterString from "@/components/SmartTable/src/SmartTableFilters/SmartTableFilterString.vue";
import SmartTableFilterSelect from "@/components/SmartTable/src/SmartTableFilters/SmartTableFilterSelect.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'string',
  },
  field: {
    type: String,
    required: true,
  }
})

const emit = defineEmits([
    'apply'
])

const filterValue = ref(null);

function applyFilterValue() {
  emit('apply', {column: props.field, pattern: filterValue.value});
}

function resetFilterValue() {
  emit('apply', {column: props.field, pattern: null});
}

</script>

<template>
  <div class="filter-wrapper">
    <div class="filter">
      <smart-table-filter-string v-if="type === 'string'" v-model="filterValue" />
      <smart-table-filter-select v-if="type === 'select'" v-model="filterValue" />
    </div>
    <div class="filter-actions">
      <button type="button" @click="applyFilterValue">Apply</button>
      <button type="button" @click="resetFilterValue">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.filter-wrapper {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.filter {
  margin-bottom: 8px;
}
.filter-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>