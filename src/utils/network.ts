import axios from "axios";
import { ElMessage } from "element-plus";
import { router } from "@/router";

/* 开发环境代理前缀 */
const baseURL = import.meta.env.MODE === 'development' ? "/api" : import.meta.env.VITE_API_URL;

const headers = {
  "Accept": "application/json",
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

const network = axios.create({
  timeout: 10000,
  withCredentials: true,
  baseURL,
  headers,
});

/**
 * 响应拦截
 */
network.interceptors.response.use(
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
network.interceptors.request.use(
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

export default network;
