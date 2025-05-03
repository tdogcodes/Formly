import { FormBlockInstance } from "@/@types/formBlock.type";
import { FormBlocks } from "@/lib/formBlocks";
import React from "react";

const ChildPropertiesComponentWrapper = ({
  index,
  parentId,
  blockInstance,
}: {
  index: number;
  parentId: string;
  blockInstance: FormBlockInstance;
}) => {
  const PropertiesComponent =
    FormBlocks[blockInstance.blockType].propertiesComponent;
  if (!PropertiesComponent) return null;

  return (
    <PropertiesComponent
      positionIndex={index}
      parentId={parentId}
      blockInstance={blockInstance}
    />
  );
};

export default ChildPropertiesComponentWrapper;