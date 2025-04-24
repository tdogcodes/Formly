'use client'
import { Fragment } from "react";
import { motion } from "framer-motion"
import { StarIcon } from "lucide-react";

const words = [
  "user-first", "accessible", "delightful", "on-brand",
  "fast-loading", "keyboard-friendly", "mobile-ready", "streamlined",
  "conversion-optimized", "flexible", "easy to build", "intuitive",
  "user-first", "accessible", "delightful", "on-brand",
  "fast-loading", "keyboard-friendly", "mobile-ready", "streamlined",
  "conversion-optimized", "flexible", "easy to build", "intuitive"
];

 const TapeSection = () => {
  return (
  <div className="py-16 lg:py-24 overflow-x-clip">
   <div className="bg-gradient-to-r from-white to-secondary-400  -rotate-3 -mx-1">
      <div className="flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}> 
          <motion.div initial={{x: '-50%'}} animate={{x: 0}} transition={{duration: 50, ease: "linear", repeat: Infinity}} className="flex flex-none gap-4 py-3">
          {Array.from({ length: 2 }).map((_,i)=> (
              <Fragment key={i}>
                {words.map(word=>
                  (
                    <div key={word} className="inline-flex gap-4 items-center">
                      <span className="text-gray-900 uppercase font-extrabold text-lg">{word}</span>
                      <StarIcon/>
                    </div>
                  ))}
              </Fragment>
            ))}
          </motion.div>
      </div>
    </div>
  </div>
)};

export default TapeSection