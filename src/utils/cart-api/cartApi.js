/* eslint-disable @typescript-eslint/no-unused-vars */

import { instanceAxios } from "../https";

export const addToCartApi = async (
  path = "",
  body = { product: {}, quantity: 0, userId: "" }
) => {
  try {
    const userId = localStorage.getItem("userId");
    const data = instanceAxios.post(path, { ...body, userId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getToCartApi = async (path = "") => {
  try {
    const data = instanceAxios.get(path);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateToCartApi = async (
  path,
  params = { productId: "", quantity: 0, userId: "" }
) => {
  try {
    const userId = localStorage.getItem("userId");
    const data = instanceAxios.put(path, undefined, {
      params: { ...params, userId },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteToCartApi = async (path, params) => {
  try {
    const data = instanceAxios.delete(path, { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buyPurchasesApi = async (
  path,
  body = [{ product_id: "", buy_count: 0 }]
) => {
  try {
    const data = instanceAxios.post(path, body);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
