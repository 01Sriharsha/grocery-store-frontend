import axios from "axios";
import { BASE_URL } from "./customerService";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

//category Api's
export const getAllCategories = () => apiClient.get("/categories");

export const getSingleCategory = (categoryId) =>
  apiClient.get(`/categories/${categoryId}`);

export const createCategory = (categoryData) =>
  apiClient.post("/categories", categoryData);

export const updateCategory = (categoryId, categoryData) =>
  apiClient.put(`/categories/${categoryId}`, categoryData);

export const deleteCategory = (categoryId) =>
  apiClient.delete(`/categories/${categoryId}`);

//Sub Category Api's
export const getAllSubCategories = () => apiClient.get("/subcategories");

export const getAllSubCategoriesByCategory = (categoryId) =>
  apiClient.get(`/categories/${categoryId}/subcategories`);

export const getSingleSubCategory = (subCategoryId) =>
  apiClient.get(`/subcategories/${subCategoryId}`);

export const createSubCategory = (categoryId, subCategoryData) =>
  apiClient.post(`/categories/${categoryId}/subcategories`, subCategoryData);

export const updateSubCategory = (subCategoryId, subCategoryData) =>
  apiClient.put(`/subcategories/${subCategoryId}`, subCategoryData);

export const deleteSubCategory = (subCategoryId) =>
  apiClient.delete(`/subcategories/${subCategoryId}`);

//Products Api's
export const getAllProducts = () => apiClient.get("/products");

export const getAllProductsByCategory = (categoryId) =>
  apiClient.get(`/categories/${categoryId}/products`);

export const getAllProductsBySubCategory = (subCategoryId) =>
  apiClient.get(`/subcategories/${subCategoryId}/products`);

export const getSingleProduct = (productId) =>
  apiClient.get(`/products/${productId}`);

export const createProduct = (categoryId, subCategoryId, productData) =>
  apiClient.post(
    `/categories/${categoryId}/subcategories/${subCategoryId}/products`,
    productData
  );

export const updateProduct = (productId, productData) =>
  apiClient.put(`/products/${productId}`, productData);

export const deleteProduct = (productId) =>
  apiClient.delete(`/products/${productId}`);

export const uploadProductImages = (productId, images) => {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  return apiClient.post(`/products/${productId}/upload/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadProductImage = (productId) =>
  apiClient.get(`/products/${productId}/download/images`);

//Order Api's
export const updateOrderByAdmin = (orderId, orderData) =>
  apiClient.put(`/orders/${orderId}/admin`, orderData);

//product request Api's
export const getAllProductRequests = () => apiClient.get("/requests");

export const updateProductRequest = (requestId, requestData) =>
  apiClient.put(`/requests/${requestId}`, requestData);
