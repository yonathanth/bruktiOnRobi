"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "./Nav";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/banner_7.jpeg",
    "/banner_2.jpeg",
    "/banner_3.jpeg",
    "/banner_4.jpeg",
    "/banner_5.jpeg",
    "/banner_6.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <motion.section
        className="relative h-[40vh] lg:h-[50vh] mx-4 lg:mx-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 rounded-lg">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <AnimatePresence>
              {images.map((image, index) =>
                index === currentImageIndex ? (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={image}
                      alt={`Banner Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Buttons */}
        <div className="relative h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 lg:px-16">
          <motion.h1
            className="text-2xl sm:text-4xl lg:text-6xl font-bold text-accentthirty leading-snug lg:leading-normal"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Elevate Your Style <br className="hidden lg:block" /> With Brukti
            Shopping
          </motion.h1>
          <motion.div
            className="mt-4 pt-4 lg:mt-6 space-x-0 lg:space-x-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <button
              className="bg-accentthirty text-white px-16 py-3 rounded-md hover:bg-thirty transition"
              onClick={handleScrollToProducts}
            >
              Explore More
            </button>
            <Link href="/shop">
              <button className="bg-gray-100 text-accentthirty px-20 py-3 rounded-md hover:bg-gray-200 transition">
                SHEIN Shop
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
