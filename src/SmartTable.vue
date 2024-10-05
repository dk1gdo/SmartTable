<script setup>
import SmartTableHeader from "@/components/SmartTable/src/SmartTableHeader.vue";
import SmartTableBody from "@/components/SmartTable/src/SmartTableBody.vue";
import './assets/css/style.css';
import {computed, ref} from "vue";

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
  },
  remoteMode: {
    type: Boolean,
    default: false
  },
  sort: {
    type: Boolean,
    default: false
  },
  sortFunction: {
    type: Function,
    default: (rows, params) => {
      if (!params || params.sortType === 'none') {
        return rows;
      }
      // I am creating an array for sorting in order
      // to preserve the original array for resetting the sort
      const sortedRows = [...rows];

      const sortDirection = params.sortType === 'asc' ? 1 : -1;
      console.log(params.column);
      return sortedRows.sort((a, b) => {
        if (params.computed === null)
          return (a[params.column] > b[params.column] ? 1 : -1) * sortDirection;
        return (params.computed(a) > params.computed(b) ? 1: -1) * sortDirection;
      });
    },
  },
});


const columnsNames = computed(() => {
  if (!!props.columns) {
    return props.columns.map((column) => column.field);
  } else {
    return [];
  }
});

const sortParams = ref(null);

const getSortParams = (params) => {
  sortParams.value = {...params};
}

const prepareRows = computed(() => {
  if (props.remoteMode === false) {
    return props.sortFunction(props.rows, sortParams.value);
  }
  return props.rows;
});
</script>

<template>
  <table class="smart-table">
    <caption v-if="caption">{{ caption }}</caption>
    <smart-table-header :columns="columns" :sort="sort" @sort="getSortParams"/>
    <smart-table-body :rows="prepareRows" :columns="columnsNames"/>
  </table>
</template>

<style scoped>

</style>