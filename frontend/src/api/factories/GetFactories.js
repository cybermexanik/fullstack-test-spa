import axiosInstance from "../axios";

export const fetchFactories = async ({ offset, limit} = {}) => {
    try {
        const response = await axiosInstance.get("/factories", {
            params: { offset, limit },
        });
        return response.data;

    } catch (err) {
        console.error("Ошибка при загрузке заводов:", err);
        throw err;
    }

};