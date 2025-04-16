import { cn } from "@/lib/utils";
import React from "react";

const BuilderCanvas = () => {
  return (
    <div
      className="relative px-5  w-full h-[calc(100vh_-_64px)] 
    pt-4  overflow-auto transition-all duration-300 scrollbar"
    >
      {/* Droppable Canvas */}
      <div className="w-full h-full max-w-[650px] mx-auto">
      <div
        className={cn(`\
      w-full relative bg-transparent px-5 md:px-2 rounded-md flex flex-col
      items-center justify-start pt-1 pb-14 min-h-svh
      ring-4 ring-primary/20 ring-inset
        `)}
      >
        <div
          className="w-full mb-3
          bg-white bg-cover bg-center bg-[url(/images/form-bg.jpg)] border
          shadow-sm h-[135px] my-1 max-w-[768px] rounded-md px-1"
        />
        <div className="flex flex-col w-full gap-4">Layout Blocks</div>
      </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;