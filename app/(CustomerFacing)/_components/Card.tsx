"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CardProps {
  title: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ title, imageSrc }) => {
  // Animation control
  const controls = useAnimation();

  // Track if the card is in view
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation once when the card is in view
    threshold: 0.2, // Percentage of the card that should be in view before animating
  });

  // Start animation when card comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Link href={`#${title}`}>
      <motion.div
        ref={ref}
        className="flex flex-col items-center justify-center bg-transparent"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start with the card below and invisible
          visible: { opacity: 1, y: 0 }, // Animate it into view
        }}
        transition={{ duration: 0.5 }} // Animation duration
      >
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 mb-4">
          {" "}
          {/* Adjusted heights and widths */}
          <Image
            src={imageSrc}
            fill
            alt={title}
            className="object-cover rounded-full shadow-lg transition-transform transform hover:scale-110 duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-black text-center">
          {" "}
          {/* Adjusted font sizes */}
          {title}
        </h3>
      </motion.div>
    </Link>
  );
};

export default Card;
