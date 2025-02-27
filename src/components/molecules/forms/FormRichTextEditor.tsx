import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface FITextAreaProps {
  control: Control;
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
}
function FormRichTextEditor(props: FITextAreaProps) {
  const { name, control, label, description } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill theme="snow" {...field} className="w-full" />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default FormRichTextEditor;
