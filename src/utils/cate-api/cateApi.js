import { instanceAxios } from "../https";

export const getCateApi = async () => {
  try {
    const data = await instanceAxios.get("category/show");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createCateApi = async (body) => {
  try {
    const data = await instanceAxios.post("/create", body);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateCateApi = async (body) => {
  try {
    const data = await instanceAxios.put("/show", body);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteCateApi = async (idCate) => {
  try {
    const data = await instanceAxios.get("/delete", idCate);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
