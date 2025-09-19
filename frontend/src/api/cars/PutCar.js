import axiosInstance from "../axios";

export const putCar = async (car) => {
    try {
        const response = await axiosInstance.put(`/cars/${car.id}`, car);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }

};