import { FormBlocksType} from "@/@types/formBlock.type";
import { RowLayoutBlock } from "@/components/blocks/layout/rowLayout";
import { RadioSelectBlock } from "@/components/blocks/radioSelectBlock";
import { TextFieldBlock } from "@/components/blocks/textFieldBlock";
import { TextAreaBlock } from "@/components/blocks/textAreaBlock";

export const FormBlocks: FormBlocksType = {
    RowLayout: RowLayoutBlock,
    RadioSelect: RadioSelectBlock,
    TextField: TextFieldBlock,
    TextArea: TextAreaBlock,
} 