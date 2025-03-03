/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
  control: Control<any>;
  onChange?: (value: boolean) => void;
}
export function FormCheckbox(props: FormCheckboxProps) {
  const { name, label, description, control, onChange } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={(value: boolean) => {
              if (onChange) {
                onChange(value);
              }
              field.onChange(value);
            }} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
