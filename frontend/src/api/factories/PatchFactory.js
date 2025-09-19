import axiosInstance from "../axios";

export const patchFactory = async (id, updates) => {
    try{
        const response = await axiosInstance.patch(`/factories/${id}`, updates);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}