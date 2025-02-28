/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import FileDropzone from "@/components/molecules/forms/FileDropZone";
import { FormCheckbox } from "@/components/molecules/forms/FormCheckbox";
import FormInput from "@/components/molecules/forms/FormInput";
import FormRadioGroup from "@/components/molecules/forms/FormRadioGroup";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormRichTextEditor from "@/components/molecules/forms/FormRichTextEditor";
import { useQuery } from "@tanstack/react-query";
import { fetchAttributes, fetchProductCategories } from "../api";

interface IProps{
  branchId: string
}
const AddProductForm = ({branchId}: IProps) => {
  const [accepetedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [galleryAcceptedImages, setGalleryAcceptedImages] = useState<File[]>(
    []
  );

  const form = useForm();


  const {data: categories} = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => fetchProductCategories(branchId)
  })

  const {} = useQuery({
    queryKey: ['product-attributes'],
    queryFn: () => fetchAttributes(branchId)
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }

  
  return (
    <div className="">
      <Form {...form}>
        <h1 className="font-bold text-lg">Add Product</h1>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Details</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="name"
                  label="Product Name"
                  placeholder="Enter product name..."
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="sku"
                  label="Product SKU"
                  placeholder="Enter product sku..."
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="asin"
                  label="Product ASIN"
                  placeholder="Enter product ASIN..."
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="upc"
                  label="Product UPC"
                  placeholder="Enter product UPC..."
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
              <FormRichTextEditor control={form.control} name="short_description"
                  label="Product Short Description"/>
                
              </div>
              <div className="w-full">
              <FormRichTextEditor control={form.control}
                  name="long_description"
                  label="Product Long Description"/>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Pricing</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="price"
                  label="Product Price"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="sale_price"
                  label="Product Sale Price"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Inventory</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormCheckbox
                  control={form.control}
                  name="inventory.manage_stock"
                  label="Manage Stock"
                />
              </div>
              <div className="w-full">
                <FormCheckbox
                  control={form.control}
                  name="inventory.sold_indipendently"
                  label="Sold Indipendently"
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 pt-4">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="inventory.quantity"
                  label="Product Quantity"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="inventory.minimum_inventory"
                  label="Product Minimum Inventory"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormRadioGroup
                  control={form.control}
                  name="inventory.status"
                  label="Inventory Status"
                  items={[
                    {
                      label: "In Stock",
                      value: "in_stock",
                    },
                    {
                      label: "Out Of Stock",
                      value: "out_of_stock",
                    },
                    {
                      label: "Low On Stock",
                      value: "low_on_stock",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Category</h1>
            <p className="text-sm italic p-1 text-primary">
              If no categories shows up, create your own new categories on the
              right pane of this page under Categories section
            </p>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="category.name"
                  label="Category"
                  items={categories?.map((category) => ({label: category.name, value: category.id})) ?? []}
                />
              </div>
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="category.parent_category"
                  label="Parent Category"
                  items={[]}
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Shipping</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="shipping.shipping_class"
                  label="Shipping Class"
                  items={[]}
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="shipping.weight"
                  label="Product Weight"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="shipping.dimensions.length"
                  label="Product Length"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="shipping.dimensions.width"
                  label="Product Width"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="shipping.dimensions.height"
                  label="Product Height"
                  placeholder="0.00..."
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Attributes</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="attributes"
                  label="Attributes"
                  items={[]}
                />
              </div>
              <div className="w-full">
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="bg-muted p-2 font-semibold">Product Images</h1>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <FileDropzone
                  control={form.control}
                  name="primary_image"
                  label="Primary Image"
                  setAcceptedFiles={setAcceptedFiles}
                  accept={{
                    "image/jpeg": [".jpeg", ".png"],
                  }}
                />
              </div>
              <div className="w-full flex items-center gap-2">
                {accepetedFiles.map((file, index) => (
                  <div
                  key={index}
                  className="rounded-md w-32 h-32 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                  }}
                />
                ))}
              </div>
            </div>
            <div className="">
              <FileDropzone
                control={form.control}
                name="gallery_images"
                label="Gallery Images"
                setAcceptedFiles={setGalleryAcceptedImages}
                accept={{
                  "image/jpeg": [".jpeg", ".png"],
                }}
                multiple
              />
            </div>
            <div className="w-full flex items-center gap-2">
              {galleryAcceptedImages.map((file, index) => (
                <div
                  key={index}
                  className="border border-1 border-gray-400 rounded-md w-24 h-24 flex items-center justify-center"
                >
                  <div
                    className="rounded-md w-20 h-20"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(file)})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <ActionButton title="Create Product" loading={false} loaderText="Creating..." />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
