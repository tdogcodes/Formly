import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = (props: { url?: string; color?: string }) => {
  const { url = "/", color = "text-white" } = props;
  return (
    <div
      className="flex items-center justify-center
  sm:justify-start
    "
    >
      <Link href={url} className="flex items-center gap-2">
        <div
          className="size-[40px] lg:size-[50px]
          rounded-lg flex items-center border-2
           dark:border-gray-200 text-2xl lg:text-3xl
             justify-center 
                  "
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 2px, hsl(262, 95%, 83%) 0)",
            backgroundSize: "6px 6px",
            backgroundPosition: "-5px -5px",
          }}
        >
          💜
        </div>
        <h5
          className={cn(
            `font-bold text-[20px] md:text-[25px] lg:text-[30px]`,
            color
          )}
        >
          Formly
        </h5>
      </Link>
    </div>
  );
};

export default Logo;