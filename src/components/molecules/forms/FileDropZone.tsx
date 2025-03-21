/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { Control } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";

interface FDropzoneProps {
  accept?: {
    [key: string]: string[];
  };
  control: Control<any>;
  label: string;
  name: string;
  description?: string;
  maxFiles?: number
  multiple?: boolean
  setAcceptedFiles: (acceptedFiles: File[] ) => void;
}
const FileDropzone = (props: FDropzoneProps) => {
  const { name, control, label, description, setAcceptedFiles, accept, maxFiles, multiple } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Dropzone
              onDrop={(acceptedFiles) => setAcceptedFiles(acceptedFiles as unknown as File[])}
              accept={accept}
              maxFiles={maxFiles}
              multiple={multiple}
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  
                  className="flex bg-muted rounded-xl p-4 items-center justify-center border-4 border-dashed"
                >
                  <div {...getRootProps()}>
                    <div className="flex justify-center">
                      <MdCloudUpload
                        size={64}
                        className="bg-muted text-gray-300"
                      />
                    </div>
                    <div>
                      <Input id="picture" type="file" {...getInputProps()} />
                      <p>
                        Drag &apos;n&apos; drop some files here, or click to
                        select files
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-xs"/>
        </FormItem>
      )}
    />
  );
};

export default FileDropzone;