import { AxiosPromise } from "axios";
import network from "@/utils/network";

export function AddBill(data: {
  productTime: string;
  billType: string;
  amount: string;
  desc: string;
  type: string;
}): AxiosPromise {
  return network({
    url: "/bill/addBill",
    method: "POST",
    data,
  });
}

export function getBillList(params: {
  type: string;
  pageNum: number;
  pageSize: number;
}): AxiosPromise {
  return network({
    url: "/bill/getBillList",
    method: "GET",
    params,
  });
}

export function getAllConsumptionType(): AxiosPromise {
  return network({
    url: "/bill/getAllConsumptionType",
    method: "GET",
  });
}

export function getConsumptionType(params: {
  amount: string;
  desc: string;
}): AxiosPromise {
  return network({
    url: "/bill/getConsumptionType",
    method: "GET",
    params,
  });
}

export function AddBillConfig(data: {
  category: string;
  priceScope: string;
}): AxiosPromise {
  return network({
    url: "/bill/addBillConfig",
    method: "POST",
    data,
  });
}

export function getBillConfigList(): AxiosPromise {
  return network({
    url: "/bill/getBillConfigList",
    method: "GET",
  });
}

export function deleteBillConfig(data: { configId: string }): AxiosPromise {
  return network({
    url: "/bill/deleteBillConfig",
    method: "POST",
    data,
  });
}

export function GetStatistics(params: {
  startDate: string;
  endDate: string;
}): AxiosPromise {
  return network({
    url: "/bill/getStatistics",
    method: "GET",
    params,
  });
}

export function UpdateBill(data: {
  deleted: boolean;
  billId: string;
}): AxiosPromise {
  return network({
    url: "/bill/updateBill",
    method: "POST",
    data,
  });
}
