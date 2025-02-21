import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FormIputProps {
  name: string;
  label: string;
  description?: string;
  control: Control;
  placeholder?: string;
  type?: string;
}
const FormInput = (props: FormIputProps) => {
  const { name, label, placeholder, description, control, type } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type ?? "text"} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
