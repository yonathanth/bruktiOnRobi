"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../providers/cartContext";

const ProductInquirySection: React.FC = () => {
  const [productLink, setProductLink] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const validateInputs = () => {
    if (!productLink.trim()) {
      setError("Please enter a valid product link.");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateInputs()) return;

    const newCartItem = {
      id: Date.now().toString(),
      name: "SHEIN Product",
      price: 200,
      quantity: 1,
      link: productLink,
      remarks: remarks,
    };

    addToCart(newCartItem);

    // Clear input fields and error after adding the item to the cart
    setProductLink("");
    setRemarks("");
    setError("");
  };

  return (
    <div className="flex justify-center  px-4 pb-16 ">
      <div className="bg-gradient-to-tr from-seventy to-thirty shadow-lg rounded-lg pt-4 px-6  pb-3 sm:px-10 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-accentthirty text-center mb-4">
          Already Have a Product from SHEIN?
        </h2>
        <p className="text-center text-accentthirty mb-6">
          Paste the product link below and add any remarks like color or size
          preferences.
        </p>

        <div className="flex flex-col items-center gap-6 mb-6">
          <input
            type="text"
            placeholder="Paste SHEIN product link here"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            className={`w-full lg:w-3/4 p-4 text-gray-800 rounded-lg border ${
              error ? "border-red-500" : "border-gray-300"
            } shadow-md focus:ring-accentthirty focus:border-accentthirty`}
          />
          <textarea
            placeholder="Add any remarks (e.g., color, size)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full lg:w-3/4 p-4 text-gray-800 rounded-lg border border-gray-300 shadow-md focus:ring-accentthirty focus:border-accentthirty h-18 resize-none"
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {/* Main "Add to Cart" button, full-width */}
          <button
            className="w-full bg-accentthirty text-white py-3 px-8 rounded-lg hover:bg-thirty transition duration-300 shadow-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Secondary "Shop Our Products" button, smaller width */}
          <div className="flex justify-center my-4">
            <button
              className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 shadow-lg"
              onClick={handleScrollToProducts}
            >
              Or, Shop Our Products here!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInquirySection;
