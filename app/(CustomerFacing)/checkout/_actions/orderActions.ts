"use server";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

export async function handleCheckout(data: {
  name: string;
  phoneNumber: string;
  shippingAddress: string;
  cartItems: any[]; // You can type this better based on your cart item structure
}) {
  try {
    // Loop through each cart item to handle Shein and regular orders
    for (const item of data.cartItems) {
      if (item.link) {
        // Handle Shein order
        await prisma.sheinOrder.create({
          data: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            url: item.link,
            description: item.remarks || "", // Handle optional remarks
            pricePaidInCents: item.price * 100, // Convert price to cents
            shippingAddress: data.shippingAddress,
            quantity: item.quantity,
          },
        });
      } else {
        // Handle regular order
        await prisma.order.create({
          data: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            productId: item.id, // Use productId from item
            pricePaidInCents: item.price * 100, // Convert price to cents
            shippingAddress: data.shippingAddress,
            quantity: item.quantity,
          },
        });
      }
    }

    // Redirect to success page after processing all items
  } catch (error) {
    console.error("Checkout error:", error);

    // Redirect to failure page if something goes wrong
  }
  redirect("/checkout/success");
}
