import { Card } from "@/components/ui/card";
import React from "react";

const LandingPageCard = ({
  title,
  description,
  imageUrl,
  className,
}: {
  title: string;
  description: string;
  imageUrl: string;
  className: string;
}) => {
  return (
    <Card
      className={` sm:w-[550px] lg:w-[1000px] mt-8 z-30
        transition-all duration-500  sm:h-[300] lg:h-[600px] p-6 border-none
     bg-black/30 rounded-lg ${className}`}
    >
      <p className="text-2xl font-semibold lg:text-2xl text-center text-white">
        {title}
      </p>
      <p className="text-md mt-2 tracking-tight text-center text-white">
        {description}
      </p>
      <div className="rounded-md mt-3">
        <img
          src={imageUrl}
          className="object-cover rounded-md w-full h-full"
          alt={title}
        />
      </div>
    </Card>
  );

};

LandingPageCard.defaultProps = {
    title: "Default Title",
    description: "Default Description",
    imageUrl: "/images/formlyss.png",
    className: "",
  }

export default LandingPageCard;
