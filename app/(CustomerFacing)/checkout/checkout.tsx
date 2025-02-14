"use client";

import { useCart } from "../../providers/cartContext"; // Update the import path as necessary
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { handleCheckout } from "./_actions/orderActions"; // Path to the server action

export function CheckoutForm() {
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [error, setError] = useState<{
    name?: string;
    phoneNumber?: string;
    shippingAddress?: string;
  }>({});
  const [isPending, setIsPending] = useState<boolean>(false);

  // Phone number validation function
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Handles form submission synchronously
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setError({});

    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      setError((prev) => ({
        ...prev,
        phoneNumber: "Phone number must be 10 digits",
      }));
      return; // Prevent submission if validation fails
    }

    setIsPending(true);

    try {
      // Proceed with the checkout action if phone number is valid
      await handleCheckout({ name, phoneNumber, shippingAddress, cartItems });
      clearCart(); // Clear the cart after form submission
    } catch (err) {
      console.error("Error submitting order:", err);
      setError((prev) => ({
        ...prev,
        general: "Failed to place order. Please try again.",
      }));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-complimentSeventy to-accentthirty border border-accentthirty">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md space-y-6 border border-thirty">
        <h2 className="text-3xl font-bold text-center text-accentthirty">
          Checkout
        </h2>

        {Object.values(error).some(Boolean) && (
          <p className="text-red-600 text-center">
            Please fill in the form correctly
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <div className="text-destructive">{error.name}</div>}
          </div>

          {/* Phone Number Input */}
          <div>
            <Label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error.phoneNumber && (
              <div className="text-destructive">{error.phoneNumber}</div>
            )}
          </div>

          {/* Shipping Address Input */}
          <div>
            <Label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </Label>
            <Textarea
              id="shippingAddress"
              name="shippingAddress"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              required
              rows={4}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            {error.shippingAddress && (
              <div className="text-destructive">{error.shippingAddress}</div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Order Summary
            </h3>
            <ul className="divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ETB {item.price.toFixed(2)}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accentthirty">
              Payment Instructions
            </h3>
            <div className="p-4 bg-seventy rounded-md border border-accentthirty shadow-sm">
              <p className="text-sm text-gray-800 font-medium">
                {`Please transfer 50% of the total amount --- ETB ${
                  cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) / 2
                } --- to one of the following accounts with names: Bruktawit Daniel`}
              </p>
              <ul className="mt-2 space-y-2">
                <li className="text-sm">
                  <strong>CBE:</strong> 1000470941597
                </li>
                <li className="text-sm">
                  <strong>Bank of Abyssinia:</strong> 99229519
                </li>
                <li className="text-sm">
                  <strong>TeleBirr:</strong> 0926292483
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                After making the payment, click the button below to confirm your
                order.
              </p>
            </div>
          </div>

          {/* Submit Button with Spinner */}
          <Button
            type="submit"
            className="w-full py-3 px-4 bg-thirty hover:bg-accentthirty text-white rounded-md flex justify-center items-center"
            disabled={isPending}
          >
            {isPending ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4z"
                ></path>
              </svg>
            ) : (
              "Place Order"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
