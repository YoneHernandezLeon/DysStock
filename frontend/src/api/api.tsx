import axios from "axios";
import type { Withdrawal } from "../types/withdrawals";

const BASE_URL = "http://localhost:8000/api/";

export const getWithdrawals = async () => {
  const response = await axios.get(`${BASE_URL}withdrawals/`);
  return response.data;
};

export const getItems = async () => {
  const response = await axios.get(`${BASE_URL}items/`);
  return response.data;
};

export const getWorkers = async () => {
  const response = await axios.get(`${BASE_URL}workers/`);
  return response.data;
};

export const createWithdrawal = async (data: Withdrawal) => {
  const response = await axios.post(`${BASE_URL}withdrawals/`, data);
  return response.data;
};
