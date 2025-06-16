"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, Product } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductListing() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-4">
              <div className="mb-4">
                <AspectRatio
                  ratio={1}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Link href={`/product-detail`}>
                    <Image
                      src={`https://placehold.co/400x400/e2e8f0/334155?text=${
                        product.name.split(" ")[0]
                      }`}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                </AspectRatio>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </p>
                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
