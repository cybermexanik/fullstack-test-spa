import axiosInstance from "../axios";

export const patchCar = async (id, updates) => {
    try {
        const response = await axiosInstance.patch(`/cars/${id}`, updates);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}