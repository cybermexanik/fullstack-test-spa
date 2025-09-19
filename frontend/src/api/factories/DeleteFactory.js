import axiosInstance from "../axios";

export const deleteFactory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/factories/${id}`);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}