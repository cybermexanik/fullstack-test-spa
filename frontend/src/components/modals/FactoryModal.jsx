import React, {useEffect, useState} from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { postFactory } from "../../api/factories/PostFactory";
import {patchFactory} from "../../api/factories/PatchFactory";
import {putFactory} from "../../api/factories/PutFactory";

const FactoryModal = ({ show, onHide, refreshTable, mode = 'add', rowData = null }) => {
    const [factoryTitle, setFactoryTitle] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [employees, setEmployees] = useState('');
    const [foundationDate, setFoundationDate] = useState('');


    useEffect(() => {
        if (mode === "add") {
            setFactoryTitle("");
            setAnnualIncome("");
            setEmployees("");
            setFoundationDate("");
        }

        if (mode === "edit" && rowData) {

            setFactoryTitle(rowData.factory_title || "");
            setAnnualIncome(rowData.annual_income || "");
            setEmployees(rowData.employees_qty || "");
            setFoundationDate(rowData.foundation_date || "");

        }
    }, [mode, rowData, show]);


    const handleSubmit = async () => {
        const payload = {
            factory_title: factoryTitle.trim(),
            annual_income: annualIncome ? parseFloat(annualIncome) : null,
            employees_qty: employees ? parseInt(employees, 10) : null,
            foundation_date: foundationDate || null,
        };

        if (!payload.factory_title || !payload.annual_income || !payload.employees_qty || !payload.foundation_date) {
            alert("Заполните все поля!");
            return;
        }

        if (parseFloat(annualIncome) > 999999999999.99) {
            alert("Доход слишком большой! Максимум 15 цифр!");
            return;
        }

        try {
            if (mode === "add") {
                await postFactory(payload);
            } else if (mode === "edit" && rowData?.id) {
                await patchFactory(rowData.id, payload);
                // await putFactory(rowData.id, payload);
            }

            refreshTable?.();
            onHide();
        } catch (err) {
            console.error("Ошибка при сохранении завода: ", err.response?.data.message || err.message);
        }
    };


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Добавление производителя" : "Редактирование производителя"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Название завода</Form.Label>
                        <Form.Control
                            value={factoryTitle}
                            onChange={(e) => setFactoryTitle(e.target.value)}
                            placeholder="Введите название"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Годовой доход</Form.Label>
                        <Form.Control
                            type="number"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            placeholder="Введите доход"
                            isInvalid={annualIncome && parseFloat(annualIncome) > 999999999999.99}
                        />
                        <Form.Control.Feedback type="invalid">
                            Слишком большая сумма (максимум 15 цифр)
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Количество сотрудников</Form.Label>
                        <Form.Control
                            type="number"
                            value={employees}
                            onChange={(e) => setEmployees(e.target.value)}
                            placeholder="Введите количество сотрудников"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Дата основания</Form.Label>
                        <Form.Control
                            type="date"
                            value={foundationDate}
                            onChange={(e) => setFoundationDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>
                    {mode === "add" ? "Добавить" : "Сохранить"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FactoryModal;
