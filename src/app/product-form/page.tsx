"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description is too short." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, { message: "Stock can't be negative." }),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function ProductForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
  });

  const { mutateAsync: createProductFn, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      alert("Product created successfully!");
      router.push("/");
    },
    onError: (error) => {
      alert(`Error creating product: ${error.message}`);
    },
  });

  const handleCreateProduct = async (data: ProductFormData) => {
    await createProductFn(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Product</h1>

        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" type="text" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                {...register("stockQuantity")}
              />
              {errors.stockQuantity && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
