import React, {useCallback, useState} from "react";
import '../../../styles/table-styles.css'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {fetchFactories} from "../../../api/factories/GetFactories";
import {factoryColumns} from "../../columns/factoryData";
import FactoryModal from "../../modals/FactoryModal";
import {deleteFactory} from "../../../api/factories/DeleteFactory";

ModuleRegistry.registerModules([AllCommunityModule]);

const FactoriesTable = ({showAction = true}) => {
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

                    const res = await fetchFactories({ offset, limit });
                    const rowsThisPage = (res.rows || []).map((factory) => {
                        return { ...factory };
                    });

                    const lastRow = Number(res.totalFactories?.count) || rowsThisPage.length;

                    paramsRequest.successCallback(rowsThisPage, lastRow);

                } catch (err) {
                    console.error('Ошибка при загрузке данных для таблицы заводов: ', err);
                    paramsRequest.failCallback();
                } finally {
                    setLoading(false);
                }
            },
        };

        params.api.setGridOption('datasource', dataSource);
        params.api.purgeInfiniteCache();

    }, []);


    const handleAdd = () => {
        setModalMode('add');
        setSelectedRow(null);
        setModalVisible(true);
    };


    const handleEdit = (params) => {
        if (!gridApi) return;

        const selected = gridApi.getSelectedRows()[0];
        if (!selected) {
            alert('Выберите строку для редактирования');
            return;
        }

        setModalMode('edit');
        setSelectedRow(selected);
        setModalVisible(true);
    };


    const handleDelete = async () => {
        if (!gridApi) return;

        const selected = gridApi.getSelectedRows()[0];

        if (!selected) {
            alert('Выберите строку для удаления');
            return;
        }

        if (!window.confirm(`Удалить завод "${selected.factory_title}"?`)) return;

        try {
            await deleteFactory(selected.id);
            alert('Завод удалён успешно!');
            refreshTable();
        } catch (err) {
            console.error('Ошибка при удалении завода: ', err);
            alert('Ошибка при удалении!');
        }
    };


    const refreshTable = () => {
        if (gridApi) {
            gridApi.purgeInfiniteCache();
        }
    };

    return (
        <div className='table-container' style={{ width: "100%" }}>
            <div className="table-header">
                <h1 className="table-title">Производители</h1>

                {showAction && (
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
                    columnDefs={factoryColumns}
                    defaultColDef={defaultColDef}
                    rowModelType="infinite"
                    cacheBlockSize={20}
                    maxBlocksInCache={1}
                    onGridReady={onGridReady}
                    rowHeight={50}
                    rowSelection={"single"}
                    maxConcurrentDatasourceRequests={1}
                />
            </div>

            {showAction && (
            <FactoryModal
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

export default FactoriesTable;
