import { api } from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stockQuantity: number;
  deletedAt?: string | null;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export const fetchProducts = async (q?: string): Promise<Product[]> => {
  const { data } = await api.get("/products", {
    params: {
      q,
    },
  });
  return data;
};

export const createProduct = async (
  productData: CreateProductPayload
): Promise<Product> => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await api.delete(`/products/${productId}`);
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

export const updateProduct = async ({
  productId,
  data,
}: {
  productId: string;
  data: UpdateProductPayload;
}): Promise<Product> => {
  const { data: updatedData } = await api.put(`/products/${productId}`, data);
  return updatedData;
};
