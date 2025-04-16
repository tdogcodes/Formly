import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Save, Send } from "lucide-react";

const BuilderBlockProperties = () => {
  return (
    <div className=" relative w-[320px]">
      <div
        className="fixed right w-[320px]
        bg-white border-l shadow-sm h-screen pb-36
          mt-0 scrollbar overflow-auto"
      >
        <div className="flex flex-col w-full items-center h-auto min-h-full">
          <div
            className="flex w-full flex-row items-center
                 bg-white pb-2 pt-3 sticky border-b border-gray-200 top-0 gap-2 px-2"
          >
            <Button size="sm" variant="outline" className="!text-primary !bg-primary/10 !border-primary">
              <Eye/>
              Preview
            </Button>
            <Button size="sm" variant="outline" className="!text-primary !bg-primary/10 !border-primary">
              <Save/>
              Save
            </Button>
            <Button size="sm" className="!text-white">
              <Send/>
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderBlockProperties;
