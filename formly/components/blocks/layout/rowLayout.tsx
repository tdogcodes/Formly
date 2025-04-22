import {
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "@/@types/formBlock.type";
import { Copy, GripHorizontal, Rows2, Trash } from "lucide-react";
import { FormBlockInstance } from "@/@types/formBlock.type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: ObjectBlockType = {
  blockCategory,
  blockType,

  createInstance: (id: string) => ({
    id: `row-layout-${id}`,
    blockType,
    isLocked: false,
    attributes: {},
    childBlocks: [],
  }),

  blockButtonElement: {
    icon: Rows2,
    label: "Row Layout",
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const childBlocks = blockInstance.childBlocks || [];

  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}
      <Card
        className={cn(
          `
      w-full bg-white relative border shadow-sm 
      min-h-[120px] max-w-[768px] rounded-md !p-0`,
          blockInstance.isLocked && "!rounded-t-none"
        )}
      >
        <CardContent className="px-2 pb-2">
          {!blockInstance.isLocked && (
            <div
              role="button"
              className="flex items-center w-full 
              h-[2px] cursor-move justify-center"
            >
              <GripHorizontal size="22px" className="text-muted-foreground mb-1" />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-1">
            {childBlocks.length === 0 ? (
              <Placeholder />
            ) : (
              <div className="flex items-center justify-start 
              gap-4 py-4 px-3 w-full flex-col">
                <div className="flex items-center justify-center gap-1">
                  {childBlocks.map((block)=> (
                    <div>

                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        { !blockInstance.isLocked && <CardFooter 
        className="flex items-center gap-2 justify-end border-t py-3">
          <Button variant="outline" size="icon">
            <Copy/>
          </Button>
          <Button variant="outline" size="icon">
            <Trash/>
          </Button>
          </CardFooter> }
      </Card>
    </div>
  );
}

function RowLayoutFormComponent() {
  return <div>Canvas Component</div>;
}

function RowLayoutPropertiesComponent() {
  return <div>Canvas Component</div>;
}

function Placeholder() {
  return (
    <div
      className="flex flex-col items-center justify-center border
       border-dotted bg-primary/10 border-primary hover:bg-primary/5
        w-full h-28 text-primary font-medium text-base gap-1"
    >
      <p className="text-center text-primary/80">
        Drag and drop a block here to get started
      </p>
    </div>
  );
}

function Border() {
  return <div className="w-full rounded-t-md min-h-[8px] bg-primary" />;
}
