import axios from "axios";

export const BASE_URL = "http://localhost:9191/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = (loginData) => apiClient.post("/login", loginData);

export const createCustomer = (customerData) =>
  apiClient.post("/customers", customerData);
