import axiosInstance from "./Axios";

export const userSignup = async (formData) => {
    try {
  
      const data = await axiosInstance.post("/userSignup", formData);  
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
    

export const userLogin = async(formData) => {
    try {
        console.log(formData,"formdara");
        
        const data = await axiosInstance.post("/userLogin",formData)
        return data
    } catch (error) {
        console.log(error.message);   
    }
}

export const productListing = async () => {
  try {
    const data = await axiosInstance.get("/products")
    console.log(data,"data");
    
    return data
  } catch (error) {
    console.log(error.message);       
  }
}