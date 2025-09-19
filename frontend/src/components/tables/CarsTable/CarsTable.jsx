import React, { useState, useCallback } from "react";
import '../../../styles/table-styles.css'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { fetchCars } from "../../../api/cars/GetCars";
import { carColumns } from "../../columns/carData";
import CarModal from "../../modals/CarModal";
import {deleteCar} from "../../../api/cars/DeleteCar";


ModuleRegistry.registerModules([AllCommunityModule]);

const CarsTable = ({showActions = true}) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedRow, setSelectedRow] = useState(null);
    const [gridApi, setGridApi] = useState(null);


    const defaultColDef = {
        flex: 1,
        // sortable: true,
        // filter: true,
    };


    const onGridReady = useCallback((params) => {
        setGridApi(params.api);

        const dataSource = {
            getRows: async (paramsRequest) => {
                const { startRow, endRow } = paramsRequest;
                const limit = endRow - startRow;
                const offset = startRow;

                try {
                    setLoading(true);

                    const res = await fetchCars({ offset, limit });
                    const rowsThisPage = (res.rows || []).map((car) => {
                        return { ...car };
                    })

                    const lastRow = Number(res.totalCars?.count) || rowsThisPage.length;
                    paramsRequest.successCallback(rowsThisPage, lastRow);

                } catch (err) {
                    console.error("Ошибка при загрузке данных для таблицы автомобилей: ", err);
                    paramsRequest.failCallback();
                } finally {
                    setLoading(false);
                }
            },
        };

        params.api.setGridOption("datasource", dataSource);

    }, []);


    const handleAdd = () => {
        setModalMode("add");
        setSelectedRow(null);
        setModalVisible(true);
    };


    const handleEdit = () => {
        if (!gridApi) return;

        const selected = gridApi.getSelectedRows()[0];
        if (!selected) {
            alert("Выберите строку для редактирования");
            return;
        }

        setModalMode("edit");
        setSelectedRow(selected);
        setModalVisible(true);
    };


    const handleDelete = async () => {
        if (!gridApi) return;

        const selected = gridApi.getSelectedRows()[0];

        if (!selected) {
            alert("Выберите строку для удаления");
            return;
        }

        if (!window.confirm(`Удалить автомобиль "${selected.car_brand}"?`)) return;

        try {
            await deleteCar(selected.id);
            alert("Автомобиль удалён успешно!");
            refreshTable();
        } catch (err) {
            console.error("Ошибка при удалении авто:", err);
            alert("Ошибка при удалении!");
        }
    };


    const refreshTable = () => {
        if (gridApi) {
            gridApi.refreshInfiniteCache();
        }
    };

    return (
        <div className='table-container' style={{ width: "100%" }}>
            <div className="table-header">
                <h1 className="table-title">Автомобили</h1>

                {showActions && (
                <div className="table-actions">
                    <button className="action-btn add" onClick={handleAdd}>
                        + Добавить
                    </button>
                    <button className="action-btn edit" onClick={handleEdit}>
                        Изменить
                    </button>
                    <button className="action-btn delete" onClick={handleDelete}>Удалить</button>
                </div>
                )}
            </div>

            <div style={{ height: 400, width: "100%" }} className="ag-theme-alpine">
                {loading && <p>Загрузка машин...</p>}
                <AgGridReact
                    columnDefs={carColumns}
                    defaultColDef={defaultColDef}
                    rowModelType="infinite"
                    cacheBlockSize={5}
                    maxBlocksInCache={10}
                    onGridReady={onGridReady}
                    rowHeight={50}
                    rowSelection={"single"}
                    maxConcurrentDatasourceRequests={1}
                />
            </div>

            {showActions && (
            <CarModal
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                mode={modalMode}
                rowData={selectedRow}
                refreshTable={refreshTable}
            />
            )}
        </div>
    );
};

export default CarsTable;
