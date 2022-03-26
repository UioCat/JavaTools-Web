import axios from "axios";
import { ElMessage } from "element-plus";
import { router } from "@/router";

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : import.meta.env.VITE_DEV_URL;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const get = (path: string, absolute: boolean = false) => {
  const url = absolute ? path : baseURL + path;
  return fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: new Headers(headers),
  });
};

export const post = (path: string, data: object, absolute: boolean = false) => {
  const url = absolute ? path : baseURL + path;
  return fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: new Headers(headers),
    body: JSON.stringify(data),
  });
};

const request = axios.create({
  timeout: 10000,
  withCredentials: true,
  baseURL,
  headers,
});

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    const requestUrl = response.request.responseURL;
    if (res.code !== 200) {
      if (res.code === 401 && !requestUrl.includes("/user/getInfo")) {
        localStorage.removeItem("token");
        router.push({ path: "/login" });
      }
      ElMessage({
        type: "error",
        message: res.message || "未知错误",
        showClose: true,
      });
      return Promise.reject(new Error(res.message || "Error"));
    }
    return Promise.resolve(response);
  },
  (error) => Promise.reject(error)
);

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem("token")) {
      config.headers = {
        token: localStorage.getItem("token"),
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default request;
