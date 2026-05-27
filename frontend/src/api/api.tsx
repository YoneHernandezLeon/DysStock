import axios from "axios";
import type { StockIncrease, Withdrawal } from "../types/withdrawals";

const BASE_URL = "/api/";

export const getWithdrawals = async () => {
  const response = await axios.get(`${BASE_URL}withdrawals/`);
  return response.data;
};

export const createWithdrawal = async (data: Withdrawal) => {
  const response = await axios.post(`${BASE_URL}withdrawals/`, data);
  return response.data;
};

export const deleteWithdrawalLine = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}withdrawals/${id}/`);
  return response.data;
};

export const getItems = async () => {
  const response = await axios.get(`${BASE_URL}items/`);
  return response.data;
};

export const getItemsUnderSafety = async () => {
  const response = await axios.get(`${BASE_URL}items/safety/`);
  return response.data;
};

export const updateStock = async (data: StockIncrease) => {
  const response = await axios.post(`${BASE_URL}items/updateStock/`, data);
  return response.data;
};

export const getWorkers = async () => {
  const response = await axios.get(`${BASE_URL}workers/`);
  return response.data;
};
