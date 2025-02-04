"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";

interface RadioProps {
  name: string;
  items: { label: string; value: string | number }[];
  label: string;
  control: Control; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormRadioGroup(props: RadioProps) {
  const { control, name, label, items, onChange } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              onChange={onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {items.map((item) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={item.value}
                >
                  <FormControl>
                    <RadioGroupItem value={item.value as string} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}