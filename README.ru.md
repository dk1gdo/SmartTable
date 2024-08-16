# Smart Table

Компонент для отображения таблиц в приложениях на Vue JS.

## Использование

### Статические данные

Пример использования:

```vue

<script setup>
import SmartTable from "SmartTable";

const columns = ref([
{
  field: "name",
  label: "Имя",
},
{
  field: "email",
  label: "Email",
},
{
  field: "phone",
  label: "Телефон",
},
{
  field: "address",
  label: "Адрес",
}
]);

const rows = ref([
    {
      name: "John",
      email: "john@example.com",
      phone: "1234",
      address: "1234",
    },
    {
      name: "Tom",
      email: "tom@example.com",
      phone: "1234",
      address: "1234",
    },
    {
      name: "Harry",
      email: "harry@example.com",
      phone: "1234",
      address: "1234",
    }
  ])
</script>
<template>
  <smart-table
      caption="Тестовая таблица"
      :columns="columns"
      :rows="rows"/>
</template>
<style scoped>
  
</style>
```
