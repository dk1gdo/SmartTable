<script setup>
import SmartTableDropdown from "@/components/SmartTable/src/SmartTableDropdown.vue";
import SmartTableFilter from "@/components/SmartTable/src/SmartTableFilters/SmartTableFilter.vue";
import SmartTableSortView from "@/components/SmartTable/src/SmartTableSortView.vue";
import {reactive} from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits([
    'filter',
    'sort',
]);

const sort = reactive({
  column: null,
  type: 'asc',
})

function filterFunction(value) {
  emit('filter', value);
}

const sortChange = (index) => {
  if (sort.column !== index) {
    sort.type = 'asc';
    sort.column = index;
  } else {
    if (sort.type === 'asc') {
      sort.type = 'desc';
    } else if (sort.type === 'desc') {
      sort.type = 'none';
    } else if (sort.type === 'none') {
      sort.type = 'asc';
    }
  }
  const sortParam = {
    sortType: sort.type,
    column: typeof props.columns[sort.column].field === 'function' ? props.columns[sort.column].field.name : props.columns[sort.column].field,
    computed: typeof props.columns[sort.column].field === 'function' ? props.columns[sort.column].field : null,
  }
  emit('sort', sortParam);
}
</script>

<template>
  <thead>
    <tr>
      <th scope="col" v-for="(column, index) in columns">
        <div class="smart-table-th" @click="sortChange(index)">
          {{ column.label }}
          <div class="actions" @click.stop>
            <smart-table-sort-view v-if="index === sort.column" :sort-type="sort.type"/>
            <smart-table-dropdown v-if="column?.filter?.enabled">
              <template #dropdown>
                <smart-table-filter :field="column.field" @apply="filterFunction"/>
              </template>
            </smart-table-dropdown>
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>
<style scoped>
</style>