import { instanceAxios } from "../https";

export const getProductListApi = async () => {
  try {
    const data = await instanceAxios.get("/products");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getProductListApiByParams = async (params) => {
  try {
    const data = await instanceAxios.get("/products", params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductApiById = async (productId) => {
  try {
    const data = await instanceAxios.get(`/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductRelationApi = async (params) => {
  try {
    const data = await instanceAxios.get("products", { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
