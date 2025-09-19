import axiosInstance from "../axios";

export const postFactory = async (factory) => {
    try {
        const response = await axiosInstance.post("/factories", factory);
        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}