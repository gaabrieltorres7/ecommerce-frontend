"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrders, Order, OrderStatus } from "@/services/orders";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getStatusBadge = (status: OrderStatus) => {
  const statusStyles: Record<OrderStatus, string> = {
    DELIVERED: "bg-green-100 text-green-800",
    PROCESSING: "bg-yellow-100 text-yellow-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
    CART: "bg-gray-200 text-gray-800",
    RECEIVED: "bg-purple-100 text-purple-800",
  };
  return (
    <Badge
      variant="secondary"
      className={`${statusStyles[status] ?? "bg-gray-100 text-gray-800"}`}
    >
      {status}
    </Badge>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export default function CustomerOrdersPage() {
  const [startDate, setStartDate] = useState<string>(() => {
    const year = new Date().getFullYear();
    return `${year}-01-01`;
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["admin-orders", startDate, endDate],
    queryFn: () => fetchOrders({ startDate, endDate }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customer Orders</h1>
        <p className="text-gray-500 mt-1">
          View and filter all orders placed in the store.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
        <div className="grid gap-2">
          <label htmlFor="start-date" className="text-sm font-medium">
            Start Date
          </label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="end-date" className="text-sm font-medium">
            End Date
          </label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-red-600"
                >
                  Error loading orders. Please try again.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(order.orderStatus)}
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && !isError && orders?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No orders found for the selected period.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
