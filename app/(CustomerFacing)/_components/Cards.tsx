"use client";
import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const categories = [
  { title: "Top Picks", imageSrc: "/toppicks.webp" },
  { title: "Tops", imageSrc: "/tops.webp" },
  { title: "Skirts", imageSrc: "/skirts.jpeg" },
  { title: "Trousers", imageSrc: "/trousers.jpeg" },
  { title: "Jackets", imageSrc: "/jackets.jpeg" },
  { title: "Shoes", imageSrc: "/shoes.webp" },
  { title: "Cosmetics", imageSrc: "/cosmetics.webp" },
  { title: "Accessories", imageSrc: "/accessories.jpeg" },
  { title: "Others", imageSrc: "/others.jpeg" },
];

const Cards: React.FC = () => {
  return (
    <div className="pt-14 pb-14 px-6 sm:px-8" id="products-section">
      <motion.div
        className="grid grid-cols-3 md:grid-cols-5 gap-6 sm:gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // Stagger the animation of each card
            },
          },
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ y: 50, opacity: 0 }} // Start below and hidden
            animate={{ y: 0, opacity: 1 }} // Move up and fade in
            transition={{ duration: 0.8 }} // Duration for each card animation
          >
            <Card title={category.title} imageSrc={category.imageSrc} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Cards;

{
  /* <h3 className="text-2xl sm:text-4xl font-bold text-accentthirty mb-8 ml- 4 text-center sm:text-left">
        Collections
      </h3> */
}
