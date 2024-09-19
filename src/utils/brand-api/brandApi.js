import { instanceAxios } from "../https";

export const getBrandApi = async () => {
  try {
    const data = await instanceAxios.get("category/show");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createBrandApi = async (body) => {
  try {
    const data = await instanceAxios.post("/create", body);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateBrandApi = async (body) => {
  try {
    const data = await instanceAxios.put("/update", body);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteBrandApi = async (idCate) => {
  try {
    const data = await instanceAxios.get("/delete", idCate);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
