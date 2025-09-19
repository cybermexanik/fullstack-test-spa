import axiosInstance from "../axios";

export const putFactory = async (id, factoryData) => {
    try {
        const response = await axiosInstance.put(`/factories/${id}`, factoryData);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
};