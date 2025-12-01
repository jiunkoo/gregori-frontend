import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log("Axios Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: (config.baseURL || "") + (config.url || ""),
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Axios Response Error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });

    // 401(Unauthorized)인 경우에도 전역 리다이렉트는 하지 않고,
    // 각 화면에서 필요에 따라 처리하도록 에러만 전달한다.
    return Promise.reject(error);
  }
);

export default api;
