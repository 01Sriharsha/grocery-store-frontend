import axios from "axios";

export const BASE_URL = "http://localhost:9191/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

//Customer Api's
export const loginUser = (loginData) => apiClient.post("/login", loginData);

export const createCustomer = (customerData) =>
  apiClient.post("/customers", customerData);

export const getAllCustomers = () => apiClient.get("/customers");

export const updateCustomer = (customerId, customerData) =>
  apiClient.put(`/customers/${customerId}`, customerData);

export const deleteCustomer = (customerId) =>
  apiClient.delete(`/customers/${customerId}`);

//Cart Api's
export const addOrUpdateCart = (customerId, productId) =>
  apiClient.post(`/customers/${customerId}/products/${productId}/cart`);

export const decrementCartItemQuantity = (cartItemId, cartData) =>
  apiClient.put(`/cart/${cartItemId}/decrement`, cartData);

export const getAllCartItemsByCustomerId = (customerId) =>
  apiClient.get(`/customers/${customerId}/cart`);

export const getSingleCartItemByProductId = (customerId, productId) =>
  apiClient.get(`/customers/${customerId}/products/${productId}/cart`);

export const deleteAllCartItemsOfCustomer = (customerId) =>
  apiClient.delete(`/customers/${customerId}/cart`);

export const deleteCartItem = (cartItemId) =>
  apiClient.delete(`/cart/${cartItemId}`);

//Order Api's
export const createOrder = (customerId, orderData) =>
  apiClient.post(`/customers/${customerId}/orders`, orderData);

export const getAllOrders = () => apiClient.get("/orders");

export const getAllOrdersByCustomer = (customerId) =>
  apiClient.get(`/customers/${customerId}/orders`);

export const updateOrderByCustomer = (orderId, orderData) =>
  apiClient.put(`/orders/${orderId}/customer`, orderData);

//Feedback Api's
export const createFeedback = (customerId, productId, feedbackData) =>
  apiClient.post(
    `/customers/${customerId}/products/${productId}/feedbacks`,
    feedbackData
  );

export const getAllFeedbacks = () => apiClient.get(`/feedbacks`);

export const getAllFeedbacksByCustomer = (customerId) =>
  apiClient.get(`/customers/${customerId}/feedbacks`);

export const getAllFeedbacksByProduct = (productId) =>
  apiClient.get(`/products/${productId}/feedbacks`);

export const upadteFeedback = (feedbackId, feedbackData) =>
  apiClient.put(`/feedbacks/${feedbackId}`, feedbackData);

export const deleteFeedback = (feedbackId) =>
  apiClient.delete(`/feedbacks/${feedbackId}`);

//product request Api's
export const postARequest = (requestData, customerId) =>
  apiClient.post(`/customers/${customerId}/requests`, requestData);

export const getAllProductRequestsByCustomer = (customerId) =>
  apiClient.get(`/customers/${customerId}/requests`);

export const deleteProductRequest = (requestId) =>
  apiClient.delete(`/requests/${requestId}`);
