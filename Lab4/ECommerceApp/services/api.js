import axios from "axios";

const API_URL = "https://fakestoreapi.com";
// Thạch Minh Luân - 22520827

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return ["All", ...response.data];
};

export const fetchProductsByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data;
};

export const fetchProductById = async (id) => {
  console.log("pro: " + id);
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};
// Thạch Minh Luân - 22520827
export const fetchCartById = async (id) => {
  console.log("cart: " + id);
  const response = await axios.get(`${API_URL}/carts/user/${id}`);
  return response.data;
};

export const updateCartById = async (cartId, userId, date, products) => {
  const response = await axios.put(`${API_URL}/carts/${cartId}`, {
    userId,
    date,
    products,
  });
  console.log("Da cap nha cart: " + response.data);
  return response.data;
};

export const deleteCartById = async (cartId) => {
  const response = await axios.delete(`${API_URL}/carts/${cartId}`);
  console.log("Da xoa cart: " + response.data);
  return response.data;
};
