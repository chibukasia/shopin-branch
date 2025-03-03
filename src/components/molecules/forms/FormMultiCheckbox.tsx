/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: string;
  control: Control<any>;
  items: {
    label: string;
    value: string | number;
  }[];
  onChange?: (value: boolean) => void;
}
const FormMultiCheckbox = (props: FormCheckboxProps) => {
  const { control, name, label, description, items } = props;
  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <FormField
                key={item.label}
                control={control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.label}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string | number | boolean) =>
                                      value !== item.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMultiCheckbox;
