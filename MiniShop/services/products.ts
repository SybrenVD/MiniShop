import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}`);
  return res.data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};