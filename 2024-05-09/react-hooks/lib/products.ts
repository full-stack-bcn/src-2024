
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export const loadProducts = async () => {
  const response = await fetch(`https://dummyjson.com/products`);
  const { products } = await response.json();
  return products as Product[];
};

export const searchProducts = async (search: string) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  const { products } = await response.json();
  return products as Product[];
};