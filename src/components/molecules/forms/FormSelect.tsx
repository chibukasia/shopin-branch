/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactNode } from "react"
import { Control, } from "react-hook-form"

interface FormSelectProps {
    name: string
    label?: ReactNode
    description?: string
    placeholder?: string
    control: Control<any>
    items: {
        label: string
        value: string
    }[]
    onChange?: (value: string) => void;
}
const FormSelect = (props: FormSelectProps) => {
    const {control, name, label, placeholder, items, onChange} = props
    return(
        <FormField
        control={control}
        name={name}
        render={({field}) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select onValueChange={(value)=>{
                    if (onChange){
                        onChange(value)
                    }
                    field.onChange(value)
                }} defaultValue={field.value} >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder ?? 'Select...'}/>
                        </SelectTrigger>
                        
                    </FormControl>
                    <SelectContent>
                        {items.map((item) =>(
                            <SelectItem value={item.value} key={item.label}>{item.label}</SelectItem>
                        ))}
                    </SelectContent>
                    <FormMessage className="text-xs"/>
                </Select>
            </FormItem>
        )}
         />
    )
}

export default FormSelect