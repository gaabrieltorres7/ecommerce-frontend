import { api } from "@/lib/api";

export type OrderStatus =
  | "CART"
  | "RECEIVED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  orderStatus: OrderStatus;
  orderDate: string;
  total: number;
  user: {
    email: string;
  };
}

interface FetchOrdersParams {
  startDate?: string;
  endDate?: string;
}

export const fetchOrders = async ({
  startDate,
  endDate,
}: FetchOrdersParams): Promise<Order[]> => {
  const { data } = await api.get("/orders", {
    params: {
      startDate,
      endDate,
    },
  });
  return data;
};
