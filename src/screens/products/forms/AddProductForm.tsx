/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import FileDropzone from "@/components/molecules/forms/FileDropZone";
import { FormCheckbox } from "@/components/molecules/forms/FormCheckbox";
import FormInput from "@/components/molecules/forms/FormInput";
import FormRadioGroup from "@/components/molecules/forms/FormRadioGroup";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormRichTextEditor from "@/components/molecules/forms/FormRichTextEditor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, fetchAttributes, fetchProductCategories, updateProduct } from '../api';
import { ProductCategory } from "@/screens/global-types";
import { EAttribute, EProduct } from "../types";
import FormMultiCheckbox from "@/components/molecules/forms/FormMultiCheckbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./product-schema";
import { z } from "zod";
import { MdRemoveCircleOutline } from "react-icons/md";
import uploadFile from "@/utils";
import useUserStore from "@/screens/hooks/useUserStore";
import { toast } from "sonner";

interface IProps {
  branchId: string;
  productData?: any;
}
const AddProductForm = ({ branchId, productData }: IProps) => {
  const [accepetedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [galleryAcceptedImages, setGalleryAcceptedImages] = useState<File[]>(
    []
  );
  const [showStockForm, setShowStockForm] = useState<boolean>(true);
  const [uploadingPrimary, setUploadingPrimary] = useState<boolean>(false)
  const [uploadingGallery, setUploadingGallery] = useState<boolean>(false)
  const [productAttributes, setProductAttributes] = useState<
    { name: string; items: { label: string; value: string }[] }[]
  >([]);
  const [subCategories, setSubCategories] = useState<ProductCategory[]>([]);

  const user = useUserStore(state => state.user)

  const form = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      inventory: {
        manage_stock: true,
      },
      attribute_values: [],
    },
    values: {...productData,
      category: productData?.categories[0].id,
      sub_category: productData?.categories[1].id,
      attributes: productData?.attributes.map((attr: EAttribute) => {
        return {
          name: attr.name,
          values: attr.values,
        };
      }
      ),
      attribute_values: productData?.attributes.map((attr: EAttribute) => {
        return attr.values;
      }
      ).flat(),
    },
    resolver: zodResolver(productSchema),
  });

  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => fetchProductCategories(branchId),
  });

  const { data: attributes } = useQuery({
    queryKey: ["product-attributes"],
    queryFn: () => fetchAttributes(branchId),
  });

  const {mutate, isPending} = useMutation({
    mutationKey: ['product'],
    mutationFn: (data: EProduct) => productData ? updateProduct(productData.id, data) :createProduct(data),
    onSuccess: () =>{
      toast.success(productData ? "Product updated Succesfully" : "Product Created Succesfully", {
        position: 'top-right',
      })
      form.reset()
    },
    onError(error) {
        console.log(error)
        toast.error(productData ? "Error updating product" :"Error Creating Product", {
          description: "Could not create your product",
          position: 'top-right',
        })
    },
  })

  const onValChange = (val: boolean) => {
    setShowStockForm(val);
  };

  const onValueChange = (val: string) => {
    const itemArr =
      attributes?.find(
        (attr: EAttribute) => attr.name.toLowerCase() === val.toLowerCase()
      )?.values ?? [];
    setProductAttributes((previousAttrs) => [
      ...previousAttrs,
      {
        name: val,
        items: itemArr.map((item: string) => ({ label: item, value: item })),
      },
    ]);
  };

  const onCategoryChange = (value: string) => {
    form.setValue('sub_category', undefined)
    setSubCategories(
      categories?.filter(
        (category: ProductCategory) => category.parent_category_id === value
      )
    );
  };

  const onMultiChange = (values: string[]) => {
    const items = attributes.map((attr: EAttribute) => {
      return {
        name: attr.name,
        values: values.filter((value) => attr.values.includes(value)),
      };
    });
    
    form.setValue("attributes", items.filter((item: EAttribute)=> item.values.length > 0));
  };

  const handleUploadImage = () => {
    setUploadingPrimary(true)
    uploadFile(accepetedFiles[0], user?.branch.branch_name as string).then((url)=>{
      if(url) form.setValue('primary_image', url as string)
    }).catch(console.log).finally(()=> setUploadingPrimary(false))
  }

  const handleUploadGallery = () => {
    setUploadingGallery(true)
    const promises = galleryAcceptedImages.map((imageFile)=> uploadFile(imageFile, user?.branch.branch_name as string) )
    Promise.all(promises).then((urls)=>{
      if (urls) form.setValue("image_gallery", urls as string[])
    }).catch(console.log).finally(()=> setUploadingGallery(false))
  }
  const onSubmit = (data: z.infer<typeof productSchema>) => {
    const newData: EProduct = {
      ...data,
      categories: [data.category, data.sub_category].filter((categ)=> categ !== undefined),
      branch_id: branchId,
    }
    delete newData.attribute_values
    delete newData.category
    delete newData.sub_category
    delete newData.attribute

    mutate(newData)
  };  

  console.log(productData)

  return (
    <div className="">
      <Form {...form}>
        <h1 className="font-bold text-lg">{productData ? 'Edit Product': 'Add Product'}</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                <FormRichTextEditor
                  control={form.control}
                  name="short_description"
                  label="Product Short Description"
                />
              </div>
              <div className="w-full">
                <FormRichTextEditor
                  control={form.control}
                  name="long_description"
                  label="Product Long Description"
                />
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
                  onChange={onValChange}
                />
              </div>
              {showStockForm && (
                <div className="w-full">
                  <FormCheckbox
                    control={form.control}
                    name="inventory.sold_indipendently"
                    label="Sold Indipendently"
                  />
                </div>
              )}
            </div>
            {showStockForm && (
              <>
                <div className="flex justify-between gap-4 pt-4  duration-500">
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
                      name="inventory.stock_status"
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
              </>
            )}
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
                  name="category"
                  label="Category"
                  onChange={onCategoryChange}
                  items={
                    categories?.map((category: ProductCategory) => ({
                      label: category.name,
                      value: category.id,
                    })) ?? []
                  }
                />
              </div>
              <div className="w-full">
                <FormSelect
                  control={form.control}
                  name="sub_category"
                  label="Sub Category"
                  items={subCategories?.map((category: ProductCategory) => ({
                    label: category.name,
                    value: category.id,
                  }))}
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
                  items={[{label: "Standard", value: "standard"}]}
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={form.control}
                  name="shipping.weight"
                  label="Product Weight (In Kg)"
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
                  name="attribute"
                  label="Attributes"
                  items={
                    attributes?.map(
                      (attribute: { name: string; values: string[] }) => ({
                        label: attribute.name,
                        value: attribute.name,
                        disabled: productAttributes.some(
                          (attr) => attr.name === attribute.name
                        ),
                      })
                    ) ?? []
                  }
                  onChange={onValueChange}
                />
              </div>
              <div className="w-full"></div>
            </div>
            {productAttributes.map((productAttr) => (
              <div className="flex gap-3" key={productAttr.name}>
                <div className="w-1/4 p-3">
                  <p>{productAttr.name}</p>
                </div>
                <div className="w-3/4">
                  <FormMultiCheckbox
                    control={form.control}
                    name="attribute_values"
                    items={productAttr.items}
                    onChange={onMultiChange}
                  />
                </div>
              </div>
            ))}
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
                {productData && 
                  <div
                    className="rounded-md w-32 h-32 flex items-center justify-center"
                    style={{
                      backgroundImage: "'https://firebasestorage.googleapis.com/v0/b/trendy-17370.appspot.com/o/images%2Fshopinn%2FNaivas%20Bypass%2F1741880353921hoodies-square.jpg?alt=media&token=9b6b36b5-c1c6-4878-842a-a60c96f1af24",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img src={productData.primary_image} alt="Product Image" className="w-full h-full object-cover rounded-md"/>
                  </div>
                }
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
                {accepetedFiles.length > 0 && <ActionButton type="button" title="Upload" onClick={handleUploadImage} loading={uploadingPrimary} loaderText="Uploading"/>}
              </div>
              
            </div>
            <div className="">
              <FileDropzone
                control={form.control}
                name="image_gallery"
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
                  className="relative border border-1 border-gray-400 rounded-md w-24 h-24 flex flex-col items-center justify-center"
                >
                  <div
                    className="absolute -top-2 -right-2"
                    onClick={() =>
                      setGalleryAcceptedImages(
                        galleryAcceptedImages.filter((f) => f !== file)
                      )
                    }
                  >
                    <MdRemoveCircleOutline
                      color="red"
                      size={24}
                      className="bg-white"
                    />
                  </div>
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
              {galleryAcceptedImages.length > 0 && <ActionButton type="button" title="Upload" onClick={handleUploadGallery} loading={uploadingGallery} loaderText="Uploading"/>}
            </div>
            {productData && productData.image_gallery.map((img: string) => (
                <div
                  key={img}
                  className="relative border border-1 border-gray-400 rounded-md w-24 h-24 flex flex-col items-center justify-center"
                >
                  <div
                    className="absolute -top-2 -right-2"
                    onClick={() => {}}
                  >
                    <MdRemoveCircleOutline
                      color="red"
                      size={24}
                      className="bg-white"
                    />
                  </div>
                  <div
                    className="rounded-md w-20 h-20"
                    style={{
                      backgroundImage: img,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img src={img} alt="Product Image" className="w-full h-full object-cover rounded-md"/>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center">
            <ActionButton
              title={productData ? "Edit Product" : "Create Product"}
              loading={isPending}
              loaderText={productData ? "Updating..." : "Creating..."}
              type="submit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
