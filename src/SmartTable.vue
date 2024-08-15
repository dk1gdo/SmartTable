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
  }
})

const columnsNames = computed(() => {
  if (!!props.columns) {
    return props.columns.map((column) => column.field);
  } else {
    return [];
  }
});

const filterParams = ref([]);

function filter(param) {

  const index = filterParams.value.findIndex(item => item.column === param.column);

  if (param.pattern === null) {
    if (index !== -1) {
      filterParams.value.splice(index, 1);
    }
  } else {
    if (index !== -1) {
      filterParams.value[index] = param;
    } else {
      filterParams.value.push(param);
    }
  }
}

const prepareRows = computed(() => {
  // Предварительно создаем объект для быстрого доступа к фильтрам
  const filterMap = {};
  filterParams.value.forEach(({ column, pattern }) => {
    filterMap[column] = pattern.toLowerCase(); // Приводим фильтр к нижнему регистру
  });

  return props.rows.filter((row) => {
    // Проверяем строки, останавливаясь при первом несоответствии
    for (const column in filterMap) {
      if (
          filterMap.hasOwnProperty(column) &&
          row[column].toString().toLowerCase() !== filterMap[column] // Приводим значение строки к нижнему регистру для сравнения
      ) {
        return false; // Если хотя бы один фильтр не совпадает, исключаем строку
      }
    }
    return true; // Строка проходит все фильтры
  });
});



</script>

<template>
  <table class="smart-table">
    <caption v-if="caption">{{ caption }}</caption>
    <smart-table-header :columns="columns" @filter="filter"/>
    <smart-table-body :rows="prepareRows" :columns="columnsNames"/>
  </table>
</template>

<style scoped>

</style>