export type FormCategoryType = "Layout" | "Field";

export type FormBlockType = "RowLayout"

export type ObjectBlockType = {
    blockCategory: FormCategoryType;
    blockType: FormBlockType;

    createInstance: (id: string) => FormBlockInstance;

    blockButtonElement: {
        icon: React.ElementType;
        label: string;
      };
    
    canvasComponent: React.FC<{
        blockInstance: FormBlockInstance
    }>;
    formComponent: React.FC;
    propertiesComponent: React.FC
}

export type FormBlockInstance = {
    id: string;
    blockType: FormBlockType;
    attributes?: Record<string, any>
    childBlocks?: FormBlockInstance[];
    isLocked?: boolean; 
}

export type FormBlocksType = {
    [key in FormBlockType]: ObjectBlockType;
}