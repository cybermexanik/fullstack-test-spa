import axiosInstance from "../axios";

export const postCar = async (car) => {
    try {
        const response = await axiosInstance.post("/cars", car);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}