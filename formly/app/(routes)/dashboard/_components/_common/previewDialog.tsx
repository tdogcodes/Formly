import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { defaultBackgroundColor } from "@/constant";
import { useBuilder } from "@/context/builderProvider";
import { FormBlocks } from "@/lib/formBlocks";
import { Eye } from "lucide-react";
import React from "react";

const PreviewDialog = () => {
  const { blockLayouts } = useBuilder();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="!text-primary !hover:bg-primary/10 !border-primary"
        >
          <Eye />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className="
      flex flex-col flex-grow max-h-svh h-full p-0 gap-0 w-screen max-w-full"
      >
        <DialogHeader
          className="
        pt-4 px-4 pb-4 shadow-sm bg-white"
        >
          <DialogTitle>Preview Mode</DialogTitle>
        </DialogHeader>
        <div
          className="w-full h-full overflow-y-auto scrollbar transition-all duration-300"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <div
            className="
          w-full h-full max-w-[650px] mx-auto"
          >
            <div
              className="
            w-full relative bg-transparent px-2 flex flex-col justify-start items-center pt-6 pb-14"
            >
              {blockLayouts.length > 0 && (
                <div className="flex flex-col w-full gap-4">
                  {blockLayouts.map((block) => {

                    const FormBlockComponent = FormBlocks[block.blockType].formComponent

                    return <FormBlockComponent
                    key={block.id}
                    blockInstance={block}
                    isError={false}
                    errorMessage={undefined}
                    handleBlur={undefined}
                    formErrors={undefined}
                    />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
