"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

// Define the error type
type FormErrors = {
  name?: string[];
  category?: string[];
  size?: string[];
  color?: string[];
  description?: string[];
  priceInCents?: string[];
  image?: string[] | string;
  _form?: string;
};

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState<FormErrors, FormData>(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name[0]}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          type="text"
          id="category"
          name="category"
          required
          defaultValue={product?.category || ""}
        />
        {error.category && (
          <div className="text-destructive">{error.category[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price (in dollars)</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          min="0.01"
          step="0.01"
          value={priceInCents ? priceInCents / 100 : ""}
          onChange={(e) => {
            const dollars = parseFloat(e.target.value);
            setPriceInCents(dollars ? Math.round(dollars * 100) : undefined);
          }}
          placeholder="Enter price in dollars"
        />
        <div className="text-muted-foreground">
          {priceInCents ? formatCurrency(priceInCents / 100) : ""}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Available Sizes</Label>
        <Input
          type="text"
          id="size"
          name="size"
          required
          defaultValue={product?.size || ""}
          placeholder="e.g., S, M, L, XL"
        />
        {error.size && <div className="text-destructive">{error.size[0]}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Available Colors</Label>
        <Input
          type="text"
          id="color"
          name="color"
          required
          defaultValue={product?.color || ""}
          placeholder="e.g., Red, Blue, Black"
        />
        {error.color && (
          <div className="text-destructive">{error.color[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={product == null}
          accept="image/*"
        />
        {product != null && product.imagePath && (
          <div className="mt-2">
            <Image
              src={product.imagePath}
              height={400}
              width={400}
              alt="Product Image"
              className="object-contain"
              priority
            />
          </div>
        )}
        {error.image && (
          <div className="text-destructive">{error.image[0]}</div>
        )}
      </div>
      {error._form && <div className="text-destructive">{error._form}</div>}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
