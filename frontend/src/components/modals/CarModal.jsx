import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { fetchFactories } from "../../api/factories/GetFactories";
import { postCar } from "../../api/cars/PostCar";
import { patchCar } from "../../api/cars/PatchCar";
// import { putCar } from "../../api/cars/PutCar";

const CarModal = ({ show, onHide, refreshTable, mode = 'add', rowData = null }) => {
    const [factories, setFactories] = useState([]);
    const [selectedFactory, setSelectedFactory] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [price, setPrice] = useState('');
    const [doors, setDoors] = useState('');
    const [date, setDate] = useState('');


    useEffect(() => {
        const loadFactories = async () => {
            try {
                const res = await fetchFactories({ offset: 0, limit: 50 });
                setFactories(res.rows || []);
            } catch (err) {
                console.error('Ошибка загрузки заводов: ', err);
            }
        };

        if (show) {
            loadFactories();

            if (mode === 'edit' && rowData) {
                setSelectedFactory(rowData.factory_id || '');
                setCarBrand(rowData.car_brand || '');
                setPrice(rowData.price || '');
                setDoors(rowData.doors_qty || '');
                setDate(rowData.manufacturer_date || '');
            }

            if (mode === 'add') {
                setSelectedFactory('');
                setCarBrand('');
                setPrice('');
                setDoors('');
                setDate('');
            }
        }
    }, [show, mode, rowData]);


    const handleSubmit = async () => {
        const payload = {
            factory_id: selectedFactory ? Number(selectedFactory) : null,
            car_brand: carBrand?.trim() || null,
            price: price ? parseFloat(price) : null,
            doors_qty: doors ? parseInt(doors, 10) : null,
            manufacturer_date: date || null,
        };

        if (!payload.factory_id || !payload.car_brand || !payload.price || !payload.doors_qty || !payload.manufacturer_date) {
            alert('Заполните все поля!');
            return;
        }

        if (parseFloat(price) > 99999999.99) {
            alert("Цена слишком большая! Максимум 10 цифр!");
            return;
        }

        try {
            if (mode === 'add') {
                await postCar(payload);
            } else if (mode === 'edit' && rowData?.id) {
                await patchCar(rowData.id, payload);
                // await putCar(rowData.id, payload);
            }

            refreshTable?.();
            onHide();
        } catch (err) {
            console.error('Ошибка при сохранении автомобиля: ', err.response?.data || err.message);
        }
    };


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Добавление автомобиля" : "Редактирование автомобиля"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Завод</Form.Label>
                        <Form.Select
                            value={selectedFactory}
                            onChange={(e) => setSelectedFactory(e.target.value)}
                        >
                            <option value="">Выберите завод</option>
                            {factories.map(factory => (
                                <option key={factory.id} value={factory.id}>
                                    {factory.factory_title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Марка автомобиля</Form.Label>
                        <Form.Control
                            value={carBrand}
                            onChange={(e) => setCarBrand(e.target.value)}
                            placeholder="Введите марку"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Стоимость автомобиля</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Введите стоимость"
                            isInvalid={price && parseFloat(price) > 99999999.99}
                        />
                        <Form.Control.Feedback type="invalid">
                            Слишком большая сумма (максимум 10 цифр)
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Количество дверей</Form.Label>
                        <Form.Control
                            type="number"
                            value={doors}
                            onChange={(e) => setDoors(e.target.value)}
                            placeholder="Введите количество дверей"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Дата изготовления</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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

export default CarModal;
