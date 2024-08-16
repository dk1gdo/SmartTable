# Smart Table

A component for displaying tables in Vue JS applications.

## Usage

### Static Data

Example usage:

```vue

<script setup>
import SmartTable from "SmartTable";

const columns = ref([
{
  field: "name",
  label: "Name",
},
{
  field: "email",
  label: "Email",
},
{
  field: "phone",
  label: "Phone",
},
{
  field: "address",
  label: "Address",
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
      caption="Test Table"
      :columns="columns"
      :rows="rows"/>
</template>
<style scoped>
  
</style>
```
