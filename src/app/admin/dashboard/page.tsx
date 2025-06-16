"use client";

import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, fetchProducts, Product } from "@/services/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getProductStatus = (
  product: Product
): { text: string; className: string } => {
  if (product.deletedAt) {
    return { text: "Inactive", className: "bg-yellow-100 text-yellow-800" };
  }
  if (product.stockQuantity === 0) {
    return { text: "Out of Stock", className: "bg-red-100 text-red-800" };
  }
  return { text: "Active", className: "bg-green-100 text-green-800" };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["admin-products", searchTerm],
    queryFn: () => fetchProducts(searchTerm),
  });

  const { mutateAsync: deleteProductFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      alert("Product deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting product: ${error.message}`);
    },
  });

  const handleEdit = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    await deleteProductFn(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <p className="text-gray-500 mt-1">
            View, create, edit, and delete products from the store.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                  Error loading products.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              products?.map((product) => {
                const status = getProductStatus(product);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={status.className}>
                        {status.text}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stockQuantity === 0
                            ? "text-red-600 font-medium"
                            : ""
                        }
                      >
                        {product.stockQuantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={isDeleting}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(product.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DeleteConfirmationDialog
                            onConfirm={() => handleDelete(product.id)}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            {!isLoading && !isError && products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
