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
        
        <h5
          className={cn(
            `pl-6 font-bold text-[20px] italic md:text-[25px] lg:text-[30px] tracking-wider`,
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