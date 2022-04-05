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
    url: "/monitor/bill/addBill",
    method: "POST",
    data,
  });
}

export function getBillList(params: {
  type: string;
  pageNum: number;
  pageSize: number;
  category: string;
  startTime: string;
  endTime: string;
}): AxiosPromise {
  return network({
    url: "/monitor/bill/getBillList",
    method: "GET",
    params,
  });
}

export function getAllConsumptionType(): AxiosPromise {
  return network({
    url: "/monitor/bill/getAllConsumptionType",
    method: "GET",
  });
}

export function getConsumptionType(params: {
  amount: string;
  desc: string;
}): AxiosPromise {
  return network({
    url: "/monitor/bill/getConsumptionType",
    method: "GET",
    params,
  });
}

export function AddBillConfig(data: {
  category: string;
  priceScope: string;
}): AxiosPromise {
  return network({
    url: "/monitor/bill/addBillConfig",
    method: "POST",
    data,
  });
}

export function getBillConfigList(): AxiosPromise {
  return network({
    url: "/monitor/bill/getBillConfigList",
    method: "GET",
  });
}

export function deleteBillConfig(data: { configId: string }): AxiosPromise {
  return network({
    url: "/monitor/bill/deleteBillConfig",
    method: "POST",
    data,
  });
}

export function GetStatistics(params: {
  startDate: string;
  endDate: string;
}): AxiosPromise {
  return network({
    url: "/monitor/bill/getStatistics",
    method: "GET",
    params,
  });
}

export function UpdateBill(data: {
  deleted: boolean;
  billId: string;
}): AxiosPromise {
  return network({
    url: "/monitor/bill/updateBill",
    method: "POST",
    data,
  });
}
