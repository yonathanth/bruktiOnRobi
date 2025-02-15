import React from "react";
import ItemCard from "./ItemCard";
import Link from "next/link";
import prisma from "@/prisma/client";

const fetchItems = async function (category: string, home: boolean) {
  if (home) {
    return prisma.product.findMany({
      where: { isAvailableForPurchase: true, category: category },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
      select: {
        id: true,
        name: true,
        priceInCents: true,
        imagePath: true,
        size: true,
        description: true,
        color: true,
      },
    });
  }
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true, category: category },
    orderBy: { orders: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      priceInCents: true,
      imagePath: true,
      size: true,
      description: true,
      color: true,
    },
  });
};

interface CategoryProps {
  category: string;
  home: boolean;
}

const Items: React.FC<CategoryProps> = async ({ category, home }) => {
  const items = await fetchItems(category, home);
  if (items.length === 0) return null;
  return (
    <div className="pt-20 px-3 md:px-16" id={category}>
      <div className="">
        <div className="flex justify-between px-3">
          <h3 className="text-2xl font-semibold text-accentthirty mb-8">
            {category}
          </h3>
          {home && (
            <Link href={`/shop#${category}`}>
              {home && (
                <button className="text-2xl font-semibold text-gray-800 mb-8">
                  See all
                </button>
              )}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-2 ">
          {items.map((item) => (
            <ItemCard
              id={item.id}
              key={item.name}
              title={item.name}
              imageSrc={item.imagePath}
              price={item.priceInCents / 100}
              description={item.description}
              availableColors={item.color}
              availableSizes={item.size}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
