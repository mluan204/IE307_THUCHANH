import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};


export const fetchCategories = async () => { 
    const response = await axios.get(`${API_URL}/products/categories`); 
    return ['All', ...response.data]; 
}; 

export const fetchProductsByCategory = async (category) => { 
    const response = await axios.get(`${API_URL}/products/category/${category}`); 
    return response.data;
};

export const fetchProductById = async (id) => { 
  const response = await axios.get(`${API_URL}/products/${id}`); 
  return response.data; 
};

export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`); 
  return response.data;
}