"use client";
import React from "react";
import { MousePointerClickIcon, Save, Send } from "lucide-react";
import { useBuilder } from "@/context/builderProvider";
import { FormBlocks } from "@/lib/formBlocks";
import PreviewDialog from "../../dashboard/_components/_common/previewDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BuilderBlockProperties = () => {
  const { selectedBlockLayout } = useBuilder();

  const LayoutPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout.blockType]?.propertiesComponent;

  return (
    <div className="relative w-[320px]">
      <div
        className="fixed right w-[320px]
      bg-white border-l shadow-sm
      h-screen pb-36 mt-0 scrollbar overflow-auto"
      >
        <div
          className="flex flex-col w-full items-center
        h-auto min-h-full"
        >
          <div
            className="flex w-full flex-row items-center
                 bg-white pb-2 pt-3 sticky border-b border-gray-200 top-0 gap-2 px-2"
          >
            <PreviewDialog />
            <Button
                  variant="outline"
                  size="sm"
                  disabled={true}
                  className={cn(
                    `
                    !text-primary
                    !bg-primary/10 !border-primary
                        `,
                  )}
                >
                <Save />
                  Save
            </Button>
            <Button
                  disabled={true}
                  size="sm"
                  variant={"default"}
                  className="!bg-primary text-white"
                >
                      <Send />
                      Publish
                </Button>
          </div>

          {/* Layout Properties */}
          {!selectedBlockLayout ? (
            <div
              className="text-gray-400 gap-1
             text-center text-[15px] w-full flex flex-col
             items-center
             justify-center flex-1 h-auto
            "
            >
              <MousePointerClickIcon />
              <p>Click the layout to modify block</p>
            </div>
          ) : (
            <div className="w-full pt-1">
              <div
                className="px-2 pt-3 pb-3 border-b
                border-gray-200
                "
              >
                <h5
                  className="text-left
                 font-medium text-sm"
                >
                  Layout Block Properties
                </h5>

                {LayoutPropertyBlock && (
                  <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderBlockProperties;
