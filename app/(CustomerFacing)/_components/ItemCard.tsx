"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useCart } from "../../providers/cartContext"; // import your context
import { formatCurrency } from "@/lib/formatters"; // import formatCurrency
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ItemCardProps {
  id: string;
  title: string;
  imageSrc: string;
  price: number;
  description: string;
  availableSizes: string;
  availableColors: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  imageSrc,
  price,
  description,
  availableSizes = [],
  availableColors = [],
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage Dialog open state
  const { addToCart } = useCart(); // get addToCart from context

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      quantity,
      image: imageSrc,
    });
    setIsDialogOpen(false); // Close the Dialog after adding to cart
  };

  return (
    <div className="flex flex-col items-left bg-white/70  border-complimentSeventy  transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative w-full h-64 ">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover" // Fill the container
        />
      </div>

      <div className="flex flex-col gap-0 px-1">
        <h3 className="text-lg font-semibold  text-accentthirty text-left">
          {title}
        </h3>
        <p className="text-gray-700 font-semibold text-left font-sans ">
          {formatCurrency(price)}
        </p>
      </div>
      <div className="flex justify-end">
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <button
              onClick={function () {
                return setIsDialogOpen(true);
              }}
              className="bg-transparent text-accentthirty py-2 px-4 rounded-sm hover:text-thirty transition duration-200 absolute bottom-0 right-0"
            >
              <ShoppingCart />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-[90vw] md:w-[60vw] lg:w-[40vw]">
              <Dialog.Title className="text-2xl font-bold mb-4 text-center text-accentthirty">
                {title}
              </Dialog.Title>
              {/* Fixed parent container for the Dialog image */}
              <div className="relative w-full h-40 mb-4">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-64 object-contain rounded-lg p-4 bg-white"
                />
              </div>
              <p className="text-accentthirty mb-4 text-center">
                {description}
              </p>
              <p className="text-accentthirty font-semibold mb-4 text-center">
                {formatCurrency(price)}
              </p>

              <div className="text-center mb-4">
                <p className="text-accentthirty mb-2">
                  <strong>Available Sizes:</strong>{" "}
                  {availableSizes.length > 0 ? availableSizes : "Not available"}
                </p>
                <p className="text-accentthirty mb-4">
                  <strong>Available Colors:</strong>{" "}
                  {availableColors.length > 0
                    ? availableColors
                    : "Not available"}
                </p>
                <p className="text-accentthirty text-sm">
                  You will receive a call to confirm your preferred size and
                  color.
                </p>
              </div>

              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={decreaseQuantity}
                  className="bg-thirty text-seventy py-2 px-4 rounded-lg hover:bg-accentthirty transition duration-200"
                >
                  -
                </button>
                <span className="mx-4 text-xl text-accentthirty">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="bg-thirty  text-seventy  py-2 px-4 rounded-lg hover:bg-accentthirty transition duration-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-thirty  text-white py-2 px-4 rounded-lg w-full hover:bg-accentthirty transition duration-200"
              >
                Confirm
              </button>

              <Dialog.Close asChild>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-red-600 transition duration-200">
                  Close
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default ItemCard;
