import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

interface CallToActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const CallToActionButton = React.forwardRef<
  HTMLButtonElement,
  CallToActionButtonProps
>(({ text = "Sign up", className, ...props }, ref) => {
  return (
    <RegisterLink>
        <button
          ref={ref}
          className={cn(
            "group relative w-44 cursor-pointer overflow-hidden rounded-full border bg-[#aa78ff] p-2  text-center font-semibold",
            className,
          )}
          {...props}
        >
          <span className="inline-block text-xl translate-x-1 transition-all duration-300 px-3 text-black group-hover:translate-x-12 group-hover:opacity-0">
            {text}
          </span>
          <div className="absolute top-0 text-xl z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
            <span>{text}</span>
            <ArrowRight />
          </div>
          <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
        </button>
    </RegisterLink>
  );
});

CallToActionButton.displayName = "CallToActionButton";

export { CallToActionButton };
