export const carColumns = [
    { field: "id", headerName: "ID", sortable: true, filter: true, editable: false, width: 80 },
    { field: "car_brand", headerName: "Марка", sortable: true, filter: true, editable: true },
    { field: "price", headerName: "Цена", sortable: true, filter: true, editable: true, valueFormatter: params => `$${params.value}` },
    { field: "doors_qty", headerName: "Количество дверей", sortable: true, filter: true, editable: true },
    { field: "manufacturer_date", headerName: "Дата выпуска", sortable: true, filter: true, editable: true },
    { field: "factory_id", headerName: "ID завода", sortable: true, filter: true, editable: true },
    { field: "createdAt", headerName: "Создано", sortable: true, filter: true, editable: false, valueFormatter: params => new Date(params.value).toLocaleString() },
    { field: "updatedAt", headerName: "Обновлено", sortable: true, filter: true, editable: false, valueFormatter: params => new Date(params.value).toLocaleString() },
];