import {
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "@/@types/formBlock.type";
import { Rows2 } from "lucide-react";

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

function RowLayoutCanvasComponent() {
  return <div>Canvas Component</div>;
};

function RowLayoutFormComponent() {
  return <div>Canvas Component</div>;
};

function RowLayoutPropertiesComponent() {
  return <div>Canvas Component</div>;
};