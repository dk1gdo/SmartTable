# Smart Table

Компонент для отображения таблиц в приложениях на Vue JS.

## Входные параметры

Компонет принимает следующие входные параметры: 

### columns

**Тип:** *Array*,
**Обязаательный:** *да*

Принимает массив объектов, которые содержат информацию о столбцах таблицы.

Пример входных данных:

```vue
const columns = ref([
    {
        field: 'name',
        label: 'Name',
    },
]);
```
Базовый объект содержит два поля: `field` и `label`

- `field` - имя свойства в объекте строки
- `label` - отображаемый тест в шапке таблицы

`field`, также может быть функцией, которая будет вычислять столбец на основании данных строки. В таком случае, пример передачи будет выглядеть следующим образом:

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

**Тип:** *Array*, **Обязаательный:** *да*

Принимает массив объектов. Подразумевается, что каждый объект в массиве является строкой таблицы, таким образом 
свойства объектов в массиве должны соответствовать полям `field` в массиве `columns` или содержать свойства 
на которые ссылается функция для вычисления столбца.

Пример:


```vue
const rows = ref([
{ name: "John", email: "john@example.com", phone: "1234", address: "1234",},
]);
```

### sort

**Тип:** *Boolean*,  
**Обязательный:** *Нет*

Компонент поддерживает сортировку данных по столбцам. Для включения сортировки необходимо передать проп `sort` со значением `true`.

Пример:

```vue
<SmartTable :columns="columns" :rows="rows" :sort="true" />
```

Вы также можете кастомизировать логику сортировки, передав проп `sortFunction`. По умолчанию, функция сортирует значения столбца по возрастанию или убыванию. Если вам нужна собственная сортировка, функция `sortFunction` должна принимать два параметра: массив строк и параметры сортировки.

Пример:

```vue
const customSortFunction = (rows, params) => {
  if (!params || params.sortType === 'none') return rows;

  const sortedRows = [...rows];
  const sortDirection = params.sortType === 'asc' ? 1 : -1;
  
  return sortedRows.sort((a, b) => (a[params.column] > b[params.column] ? 1 : -1) * sortDirection);
};

<SmartTable :columns="columns" :rows="rows" :sort="true" :sortFunction="customSortFunction" />
```