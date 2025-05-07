'use client'
import { Fragment } from "react";
import { motion } from "framer-motion"
import { StarIcon } from "lucide-react";

const words = [
  "user-first", "accessible", "simplistic", "on-brand",
  "fast-loading", "customizable", "drag & drop", "streamlined",
  "conversion-optimized", "AI powered", "easy to build", "intuitive",
  "user-first", "accessible", "simplistic", "on-brand",
  "fast-loading", "customizable", "drag & drop", "streamlined",
  "conversion-optimized", "AI powered", "easy to build", "intuitive",
];

 const TapeSection = () => {
  return (
  <div className="py-16 lg:py-24 overflow-hidden">
   <div className="bg-gradient-to-r from-[hsla(10,0%,55%,0)] to-white/10 -rotate-3 -mx-1">
      <div className="flex [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] [mask-size:90%_90%] "> 
          <motion.div initial={{x: '-50%'}} animate={{x: 0}} transition={{duration: 40, ease: "linear", repeat: Infinity}} className="flex border-2 flex-none gap-4 py-3">
          {Array.from({ length: 2 }).map((_,i)=> (
              <Fragment key={i}>
                {words.map(word=>
                  (
                    <div key={word} className="inline-flex gap-4 items-center">
                      <span className="text-white uppercase font-extrabold text-lg md:text-2xl">{word}</span>
                      <StarIcon color="#aa78ff"/>
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