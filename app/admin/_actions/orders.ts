"use server";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export async function deleteOrder(id: string) {
  const order = await prisma.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}
export async function deleteSheinOrder(id: string) {
  const order = await prisma.sheinOrder.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}
