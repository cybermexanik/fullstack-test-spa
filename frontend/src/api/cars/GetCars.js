import axiosInstance from "../axios";

export const fetchCars = async ({offset, limit}) => {
    try {
        const response = await axiosInstance.get("/cars", {
            params: { offset, limit }
        });

        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}
