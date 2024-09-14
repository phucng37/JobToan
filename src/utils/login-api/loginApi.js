import { instanceAxios } from "../https";

export default async function postApiLogin(path, option) {
  try {
    const data = await instanceAxios.post(path, option, {
      headers: {
        // "expire-access-token": 10,
        // 'expire-refresh-token': 10
      },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
export const changeApiPassword = async (path, option) => {
  try {
    const data = await instanceAxios.post(path, option);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
