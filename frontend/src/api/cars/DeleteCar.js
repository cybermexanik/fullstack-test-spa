import axiosInstance from "../axios";

export const deleteCar = async (id) => {
    try {
        const response = await axiosInstance.delete(`/cars/${id}`);
        return response.data;

    } catch(err){
        console.error(err)
        throw err;
    }

}