export type FormCategoryType = "Layout" | "Form"

export type FormBlockType = "RowLayout"

export type FormBlock = {
    BlockCategory: FormCategoryType;
    BlockType: FormBlockType;

    blockButtonElement: {
        icon: React.ReactElement;
        label: string;    
    };

    canvasComponent: React.FC;
    formComponent: React.FC;
    

}