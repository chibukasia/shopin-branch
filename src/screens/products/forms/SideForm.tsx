"use client";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { attributeSchema, categorySchema, subcategorySchema } from './product-schema';
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttribute, createProductCategory } from "../api";
import { EAttribute, EProductCategory } from "../types";
interface IProps{
  branchId: string
}
const SideForm = ({branchId}: IProps) => {

    const categoryForm = useForm<z.infer<typeof categorySchema>>({
      resolver: zodResolver(categorySchema),
      defaultValues: {
        branch_id: branchId
      }
    });
    const subCategoryForm = useForm<z.infer<typeof subcategorySchema>>({
      resolver: zodResolver(subcategorySchema),
      defaultValues: {
        branch_id: branchId
      }
    });
    const attributesForm = useForm<z.infer<typeof attributeSchema>>({
      resolver: zodResolver(attributeSchema),
      defaultValues: {
        branch_id: branchId
      }
    });

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
      mutationKey: ['product-category'],
      mutationFn: (data: EProductCategory) => createProductCategory(data),
      onSuccess: (data)=>{
        console.log(data)
        queryClient.invalidateQueries({queryKey: ['product-categories']})
      },
      onError: (error) => {
        console.log(error)
      }
    })

    const {mutate: attributeMutate, isPending: attributePending} = useMutation({
      mutationKey: ['attribute'],
      mutationFn: (data: EAttribute) => createAttribute(data)
    })

    const onCategoriesSubmit = (data: z.infer<typeof categorySchema>) => {
      mutate(data)
    }

    const onSubcategoriesSubmit = (data: z.infer<typeof subcategorySchema>) => {
      mutate(data)
    }

    const onAttributesSubmit = (data: z.infer<typeof attributeSchema>) => {
      attributeMutate(data)
    }

    return (
        <div className="bg-white w-full p-4 my-7 grid rounded-lg shadow-md gap-6">
            <div className="grid gap-4">
                <h3 className="text-md font-semibold p-2 bg-muted">Categories Section</h3>
                <Form {...categoryForm}>
                    <form onSubmit={categoryForm.handleSubmit(onCategoriesSubmit)}>
                        <h3 className="text-md font-medium pb-3">Create Category</h3>
                        <div className="flex justify-between items-end">
                            <div className="w-3/4">
                              <FormInput control={categoryForm.control} name="name" label="Product Category"/>
                            </div>
                            
                            <div className="flex justify-end pb-2">
                              <ActionButton title="Create" type="submit" loading={isPending} loaderText="Creating..."/>
                            </div>
                            
                        </div>
                    </form>
                </Form>
                <Form {...subCategoryForm}>
                    <form onSubmit={subCategoryForm.handleSubmit(onSubcategoriesSubmit)}>
                        <h3 className="text-mdfont-medium pb-3">Create Sub Category</h3>
                        <div>
                          <FormInput control={subCategoryForm.control} name="name" label="Product Sub Category"/>
                        </div>
                        <div>
                          <FormSelect control={subCategoryForm.control} name="parent_category" label="Parent Category" items={[]}/>
                        </div>
                        <div className="flex justify-end py-2">
                          <ActionButton title="Create" type="submit" loading={isPending} loaderText="Creating..."/>
                        </div>
                    </form>
                </Form>
            </div>
            <div>
                <h3 className="text-md font-semibold p-2 bg-muted">Attributes Section</h3>
                <Form {...attributesForm}>
                    <form onSubmit={attributesForm.handleSubmit(onAttributesSubmit)}>
                        <h3 className="text-mdfont-medium pb-3">Create Attribute</h3>
                        <div>
                          <FormInput control={attributesForm.control} name="name" label="Attribute Name"/>
                        </div>
                        <div>
                          <p className="text-sm italic text-primary">Add attribute values by seperating them with a comma eg Red, Green, Blue</p>
                          <FormInput control={attributesForm.control} name="values" label="Attribute Values" placeholder="Eg. Red, Green, Blue"/>
                        </div>
                        <div className="flex justify-end py-2">
                          <ActionButton title="Create" type="submit" loading={attributePending} loaderText="Creating..."/>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SideForm;