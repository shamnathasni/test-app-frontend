import axiosInstance from "./Axios";

export const seller_addProduct = async (formData) => {
    try {
        // You don't need to set the Content-Type header here.
        const data = await axiosInstance.post("/seller/seller-addProduct", formData, 
            {headers: {
                'Content-Type': 'multipart/form-data',
            }}
        );
        return data;
    } catch (error) {
        console.error("Error uploading product:", error.message);
    }
};
