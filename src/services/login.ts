import { AxiosPromise } from "axios";
import network from "@/utils/network";

interface LoginType {
  account: string;
  password: string;
}

interface RegisterType {
  username: string;
  account: string;
  password: string;
}

export function Login(data: LoginType): AxiosPromise {
  return network({
    url: "/monitor/user/login",
    method: "POST",
    data,
  });
}

export function Register(data: RegisterType): AxiosPromise {
  return network({
    url: "/monitor/user/register",
    method: "POST",
    data,
  });
}

export function GetInfo(): AxiosPromise {
  return network({
    url: "/monitor/user/getInfo",
    method: "GET",
  });
}
