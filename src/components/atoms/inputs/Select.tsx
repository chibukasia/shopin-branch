import * as React from "react"

import {
  Select as SelectDefault,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectProps {
    onValueChange: (value: string) => void
    label?: string
    items: {label: string, value: string}[]
}
export default function Select(props: SelectProps) {
  return (
    <SelectDefault onValueChange={props.onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props?.label ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
          {props.items.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}
          
          
        </SelectGroup>
      </SelectContent>
    </SelectDefault>
  )
}