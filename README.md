
# Smart Table

A component for displaying tables in Vue JS applications.

## Input Parameters

The component accepts the following input parameters:

### columns

**Type:** *Array*,  
**Required:** *Yes*

Accepts an array of objects that contain information about the table columns.

Example of input data:

```vue
const columns = ref([
    {
        field: 'name',
        label: 'Name',
    },
]);
```

The basic object contains two fields: `field` and `label`.

- `field` - the name of the property in the row object
- `label` - the displayed text in the table header

`field` can also be a function that calculates the column value based on the row data. In this case, the input example would look like this:

```vue
const columns = ref([
    {
        field: setUppercase,
        label: 'Name',
    },
]);

const setUppercase = (row) => {
    return row.name.toUpperCase();
}
```

### rows

**Type:** *Array*,  
**Required:** *Yes*

Accepts an array of objects. It is assumed that each object in the array represents a row in the table, so the properties of the objects in the array should correspond to the `field` values in the `columns` array or contain properties that are referenced by the function used to calculate the column.

Example:

```vue
const rows = ref([
    { name: "John", email: "john@example.com", phone: "1234", address: "1234",},
]);
```

### sort

**Type:** *Boolean*,  
**Required:** *No*

The component provides the ability to sort data by columns. To enable sorting, pass the `sort` prop with a value of `true`.

Example:

```vue
<SmartTable :columns="columns" :rows="rows" :sort="true" />
```

You can also customize the sorting logic by passing a `sortFunction` prop. The default sorting function sorts the column values in ascending or descending order. If you wish to apply custom sorting, the `sortFunction` should accept two parameters: the rows array and sorting parameters.

Example:

```vue
const customSortFunction = (rows, params) => {
  if (!params || params.sortType === 'none') return rows;

  const sortedRows = [...rows];
  const sortDirection = params.sortType === 'asc' ? 1 : -1;
  
  return sortedRows.sort((a, b) => (a[params.column] > b[params.column] ? 1 : -1) * sortDirection);
};

<SmartTable :columns="columns" :rows="rows" :sort="true" :sortFunction="customSortFunction" />