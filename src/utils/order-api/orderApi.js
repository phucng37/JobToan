/* eslint-disable @typescript-eslint/no-unused-vars */

import { instanceAxios } from "../https";

export const addOrderApi = async (
  path = "",
  body = { products: [], userId: "", totalPrice: "" }
) => {
  try {
    const userId = localStorage.getItem("userId");
    const data = instanceAxios.post(path, { ...body, userId });
    return new Promise((rs) => {
      setTimeout(() => {
        rs(data);
      }, 5000);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrderApi = async (path = "") => {
  try {
    const data = instanceAxios.get(path);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateOrderApi = async (
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
