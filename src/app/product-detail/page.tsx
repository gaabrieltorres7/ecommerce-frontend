"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            width={600}
            height={600}
            src="/placeholder.svg?height=600&width=600"
            alt="Wireless Bluetooth Headphones"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Wireless Bluetooth Headphones
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Experience premium sound quality with these state-of-the-art
            wireless Bluetooth headphones. Featuring active noise cancellation,
            30-hour battery life, and premium comfort padding. Perfect for music
            lovers, professionals, and anyone who demands exceptional audio
            quality. The ergonomic design ensures all-day comfort while the
            advanced drivers deliver crystal-clear highs and deep, rich bass.
          </p>

          <div className="text-4xl font-bold text-gray-900">$249.99</div>

          <div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-100"
            >
              In Stock
            </Badge>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="h-10 w-10 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full text-lg py-6">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
