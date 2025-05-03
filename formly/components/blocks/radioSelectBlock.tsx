import { FormBlockInstance, FormBlockType, FormCategoryType, ObjectBlockType } from '@/@types/formBlock.type'
import { CircleIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Form } from '@prisma/client'

    const blockCategory: FormCategoryType ="Field"
    const blockType: FormBlockType = "RadioSelect"

type attributesType = {
    label: string;
    options: string[];
    required: boolean;
}

export const RadioSelectBlock: ObjectBlockType = {
    blockCategory,
    blockType,

    createInstance: (id: string ) => ({
        id,
        blockType,
        isLocked: false,
        attributes: {
            label: "Select an option",
            options: ["Option 1" , "Option 2", "Option 3"],
            required: false,
        },
    }),

    blockButtonElement: {  
        label: "Radio",
        icon: CircleIcon,
    },

    canvasComponent: RadioSelectCanvasComponent as React.FC<{ blockInstance: FormBlockInstance }>,
    formComponent: RadioSelectFormComponent,
    propertiesComponent: RadioSelectPropertiesComponent,
}

type NewInstance = FormBlockInstance & {
    attributes: attributesType;
}

function RadioSelectCanvasComponent({blockInstance} : {blockInstance : FormBlockInstance}) {
    const block = blockInstance as NewInstance;

    const { label, options, required } = block.attributes;

    return (
        <div
         className='flex flex-col gap-3 w-full '
        >
            <Label className='text-base !font-normal mb-2'>
                {label}
                {required && <span className='text-red-500'>*</span>}
            </Label>
                <RadioGroup
                    disabled={true}
                    className='space-y-3 disabled:cursor-default ! pointer-events-none !cursor-default'
                >
                    {options?.map((option:string, i:number)=> (
                        <div key={i} className='flex items-center space-x-2'>
                            <RadioGroupItem disabled value={option} id={option} />
                                <Label 
                                htmlFor={option} 
                                className='!font-normal'>
                                    {option}
                                </Label>
                        </div>
                    ))}
                </RadioGroup>
        </div>
    )
}

function RadioSelectFormComponent(){
    return (
        <div>Radio Form</div>
    )
}

function RadioSelectPropertiesComponent(){
    return (
        <div>Radio Properties</div>
    )
}   