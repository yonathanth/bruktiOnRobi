"use client";
import React, { useState } from "react";
import { useCart } from "../../providers/cartContext";
import Link from "next/link";
import { ShoppingCart, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

const CartModal = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.split(" ").slice(0, 3).join(" ") + "...";
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bg-black bg-opacity-50 z-20"
          onClick={toggleCart}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-pink-50 shadow-xl z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-gray-900 text-2xl "
          onClick={toggleCart}
        >
          ✕
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-accentthirty text-center">
            Your Cart
          </h2>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 p-2 bg-gradient-to-r from-complimentSeventy to-thirty rounded-sm hover:bg-complimentSeventy transition-all duration-300 ease-in-out relative"
                >
                  {item.link ? (
                    <div className="ml-4">
                      <h3 className="font-semibold text-accentthirty text-lg">
                        {item.name}
                      </h3>
                      <a
                        href={item.link}
                        target="_blank"
                        className="text-blue-500 font-semibold"
                      >
                        View Product
                      </a>
                      <p className="text-accentthirty">
                        {truncateText(item.remarks || "", 20)}
                      </p>
                      <p className="text-accentthirty font-semibold">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-accentthirty text-lg">
                          {item.name}
                        </h3>
                        <p className="text-accentthirty">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-accentthirty font-semibold">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </>
                  )}
                  <button
                    className="absolute top-10 right-8 text-red-900 hover:text-red-800"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash size={22} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-accentthirty text-center">
                Your cart is empty
              </p>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span className="text-black">ETB {subtotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full py-3 bg-red-700 text-white rounded-full shadow-lg hover:bg-red-500 transition-all duration-300 ease-in-out"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link href="/checkout">
                <button className="w-full py-3 bg-accentthirty mt-5 text-white rounded-full shadow-lg hover:bg-thirty transition-all duration-300 ease-in-out">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleCart}
        className="fixed top-7 right-4 p-3 bg-accentthirty text-white rounded-full shadow-lg hover:bg-thirty transition-all z-30"
      >
        <ShoppingCart size={18} />
        {totalItems >= 1 && (
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center transition-all">
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
};

export default CartModal;
