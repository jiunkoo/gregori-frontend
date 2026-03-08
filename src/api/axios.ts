import axios from "axios";

interface ApiResponseWrapper<T = unknown> {
  status: "SUCCESS" | "ERROR";
  data?: T;
  message?: string;
}

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponseWrapper | undefined;

    if (body && typeof body === "object" && "status" in body) {
      if (body.status === "SUCCESS") {
        response.data = body.data;
        return response;
      }
      const message = body.message ?? "오류가 발생했습니다.";
      return Promise.reject(
        Object.assign(new Error(message), { response, code: "API_ERROR" }),
      );
    }

    return response;
  },
  (error) => {
    const body = error.response?.data as ApiResponseWrapper | undefined;
    if (
      body &&
      typeof body === "object" &&
      body.status === "ERROR" &&
      body.message
    ) {
      error.message = body.message;
    }
    return Promise.reject(error);
  },
);

export default api;
