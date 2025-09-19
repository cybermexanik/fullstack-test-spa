export const factoryColumns = [
    { field: "id", headerName: "ID", sortable: true, filter: true, editable: false, width: 80 },
    { field: "factory_title", headerName: "Название завода", sortable: true, filter: true, editable: true },
    { field: "annual_income", headerName: "Годовой доход", sortable: true, filter: true, editable: true, valueFormatter: params => `$${parseFloat(params.value).toLocaleString()}` },
    { field: "employees_qty", headerName: "Количество сотрудников", sortable: true, filter: true, editable: true },
    { field: "foundation_date", headerName: "Дата основания", sortable: true, filter: true, editable: true },
    { field: "createdAt", headerName: "Создано", sortable: true, filter: true, editable: false, valueFormatter: params => new Date(params.value).toLocaleString() },
    { field: "updatedAt", headerName: "Обновлено", sortable: true, filter: true, editable: false, valueFormatter: params => new Date(params.value).toLocaleString() },
];
