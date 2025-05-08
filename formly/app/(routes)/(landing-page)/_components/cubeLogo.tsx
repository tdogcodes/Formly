"use client";
import React from "react";
import { motion } from "framer-motion";

const cubeLogo = ({
  text,
  outermost,
  styleText,
}: {
  text: string;
  outermost?: string;
  styleText?: string;
}) => {
  return (
    <button className={`btn cube italic cube-hover ${outermost}`} type="button">
      <div className="bg-top">
        <div className="bg-inner"></div>
      </div>
      <div className="bg-right">
        <div className="bg-inner"></div>
      </div>
      <div className="bg">
        <div className="bg-inner"></div>
      </div>
      <motion.div
        className={`text px-2 relative block !tracking-wide overflow-hidden whitespace-nowrap ${styleText}`}
        initial="initial"
        animate="animate"
      >
        <div>
          {text.split("").map((l, i) => (
            <motion.span
              className="inline-block"
              key={i}
              transition={{ duration: 1, delay: i * 0.2 }}
              variants={{
                initial: { opacity: 1, y: 0 },
                animate: { opacity: 0, y: "-100%" },
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <div className="absolute inset-0">
          {text.split("").map((l, i) => (
            <motion.span
              className="inline-block"
              key={i}
              transition={{ duration: 1, delay: i * 0.2 }}
              variants={{
                initial: { opacity: 0, y: "100%" },
                animate: { opacity: 1, y: 0 },
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </button>
  );
};

export default cubeLogo;
