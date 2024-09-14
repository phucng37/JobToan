import { instanceAxios } from "../https";

export const postApiRegister = async (path, option) => {
  try {
    const data = await instanceAxios.post(path, option);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
