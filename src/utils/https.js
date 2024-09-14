import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://api-ecom.duthanhduoc.com/",
  headers: {
    "Content-Type": "application/json",
    // 'expire-access-token': 10
  },
});

//interceptors request
instanceAxios.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      config.headers.Authorization = `${access_token}`;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

let requestAcessTokenExpired = null;

//interceptors response
instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.data?.data?.name === "EXPIRED_TOKEN") {
      requestAcessTokenExpired =
        requestAcessTokenExpired || handleWhenAccessTokenExpired();
      await requestAcessTokenExpired;
      requestAcessTokenExpired = null;
      return instanceAxios(error.response.config);
    }
    return Promise.reject(error);
  }
);

//request when access token expired
const handleWhenAccessTokenExpired = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const data = await instanceAxios.post(
      "/refresh-access-token",
      { refresh_token },
      { headers: { "expire-access-token": 10 } }
    );
    localStorage.setItem("access_token", data?.data?.data?.access_token);
    return data;
  } catch (error) {
    console.log("lỗi", error);
  }
};
