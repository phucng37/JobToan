import { instanceAxios } from "../https";

export const getProductListApi = async () => {
  try {
    const data = await instanceAxios.get("/product/get-all");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getProductListApiByParams = async (params) => {
  try {
    const data = await instanceAxios.get("/product/filter-product", {params});
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductApiById = async (productId) => {
  try {
    const data = await instanceAxios.get(`/product/detail/${productId}`);
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
