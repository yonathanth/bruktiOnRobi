"use server";

import prisma from "@/prisma/client";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Ensure the products directory exists
async function ensureProductsDirectory() {
  try {
    await fs.mkdir("public/products", { recursive: true });
    console.log("Products directory ensured");
  } catch (error) {
    console.error("Error creating products directory:", error);
  }
}

// Call this function when the module is loaded
ensureProductsDirectory();

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  description: z.string().min(1, "Description is required"),
  priceInCents: z.coerce
    .number()
    .int()
    .min(1, "Price must be greater than 0")
    .transform((val) => Math.round(val * 100)), // Convert dollars to cents
  image: imageSchema.refine((file) => file.size > 0, "Image is required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    // Generate a unique filename for the image
    const uniqueId = crypto.randomUUID();
    const fileExtension = data.image.name.split(".").pop();
    const imagePath = `/products/${uniqueId}.${fileExtension}`;

    try {
      // Write the image file using a more reliable approach
      const bytes = await data.image.arrayBuffer();
      await fs.writeFile(`public${imagePath}`, new Uint8Array(bytes));

      // Log the image path for debugging
      console.log(`Image saved to: public${imagePath}`);
    } catch (error) {
      console.error("Error saving image:", error);
      return { image: "Failed to save image" };
    }

    // Create the product in the database
    try {
      await prisma.product.create({
        data: {
          isAvailableForPurchase: false,
          name: data.name,
          category: data.category,
          description: data.description,
          priceInCents: data.priceInCents,
          size: data.size,
          color: data.color,
          imagePath,
        },
      });

      // Log successful product creation
      console.log(`Product created with image path: ${imagePath}`);
    } catch (error) {
      // If database creation fails, clean up the uploaded image
      try {
        await fs.unlink(`public${imagePath}`);
      } catch (unlinkError) {
        console.error(
          "Error cleaning up image after failed product creation:",
          unlinkError
        );
      }
      console.error("Error creating product:", error);
      return { _form: "Failed to create product" };
    }

    revalidatePath("/");
    revalidatePath("/products");

    redirect("/admin/products");
  } catch (error) {
    console.error("Unexpected error in addProduct:", error);
    return { _form: "An unexpected error occurred" };
  }
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await prisma.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    try {
      // Delete the old image
      await fs.unlink(`public${product.imagePath}`);

      // Generate a unique filename for the new image
      const uniqueId = crypto.randomUUID();
      const fileExtension = data.image.name.split(".").pop();
      imagePath = `/products/${uniqueId}.${fileExtension}`;

      // Write the new image file
      const bytes = await data.image.arrayBuffer();
      await fs.writeFile(`public${imagePath}`, new Uint8Array(bytes));
    } catch (error) {
      console.error("Error updating image:", error);
      return { image: "Failed to update image" };
    }
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        size: data.size,
        color: data.color,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return { _form: "Failed to update product" };
  }

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await prisma.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });

  if (product == null) return notFound();

  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}
