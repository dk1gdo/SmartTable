<script setup>
import SmartTableDropdown from "@/components/SmartTable/src/SmartTableDropdown.vue";
import SmartTableFilter from "@/components/SmartTable/src/SmartTableFilters/SmartTableFilter.vue";

defineProps({
  columns: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits([
    'filter'
])

function filterFunction(value) {
  emit('filter', value);
}
</script>

<template>
  <thead>
    <tr>
      <th scope="col" v-for="column in columns">
        <div class="smart-table-th">
          {{ column.label }}
          <smart-table-dropdown v-if="column?.filter?.enabled">
            <template #dropdown>
              <smart-table-filter :field="column.field" @apply="filterFunction"/>
            </template>
          </smart-table-dropdown>
        </div>
      </th>
    </tr>
  </thead>
</template>

<style scoped>
</style>