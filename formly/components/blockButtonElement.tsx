import { ObjectBlockType } from "@/@types/formBlock.type";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const BlockButtonElement = ({
  FormBlock,
  disabled,
}: {
  FormBlock: ObjectBlockType;
  disabled?: boolean;
}) => {
  const { icon: Icon, label } = FormBlock.blockButtonElement;

  return (
    <Button disabled={disabled} className={cn(
        "flex flex-col gap-2 h-[75px] w-20 cursor-grab shadow-lg hover:!shadow-primary/50 transition duration-800 !bg-white border text-gray-600 hover:ring-1 hover:!ring-primary")}>  
      <Icon className="!w-8 !h-8 !stroke-[0.9] !cursor-grab" />
      <h5 className="text-[11.4px] text-gray-600 -mt-1" style={{ fontWeight: 500}}>{label}</h5>
    </Button>
  );
};

export default BlockButtonElement;
