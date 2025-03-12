import { z } from "zod";

const inventorySchema = z.object({
    manage_stock: z.boolean().default(false),
    sold_independently: z.boolean().default(true),
    quantity: z.coerce.number({required_error: "Quantity is required"}).nonnegative({message: "Quantity cannot be less than 0"}),
    minimum_inventory: z.coerce.number().nonnegative({message: "Minimum Inventory cannot be less than 0"}).optional(),
    status: z.string().optional(),
})

const productAttribute = z.object({
    name: z.string({required_error: "Attribute name required"}),
    values: z.string().array().nonempty(),
})

const productShipping = z.object({
    shipping_class: z.string().optional(),
    weight: z.string().optional(),
    dimensions: z.object({
        length: z.coerce.number().optional().default(0),
        width: z.coerce.number().optional().default(0),
        height: z.coerce.number().optional().default(0),
    }),
})

export const productSchema = z.object({
    name: z.string({required_error: 'Product name required'}),
    sku: z.string().optional(),
    upc: z.string().optional(),
    asin: z.string().optional(),
    short_description: z.string({required_error: 'This field is required'}).min(50),
    long_description: z.string({required_error: 'This field is required'}).min(50).optional(),
    price: z.coerce.number().gt(0, {message: "Price must be greater than 0"}),
    sale_price: z.coerce.number().gt(0, {message: "Sale price must be greater than 0"}).optional(),
    category: z.string({required_error: 'Category is required'}),
    sub_category: z.string().optional(),
    primary_image: z.string({required_error: "Primary Image is required"}),
    gallery_images: z.string().array().optional(),
    inventory: inventorySchema.optional(),
    attribute: z.string().optional(),
    attributes: productAttribute.array().optional(),
    attribute_values: z.string().array(),
    shipping: productShipping.optional(),
})

/*
@todo 
Update Side forms ✅
Create side form schemas if necessary ✅
integrate side forms to api ✅
update the product attributes section to display values to select ✅
Switch parent category and category ✅
Hide inventory fields based on managed stock value ✅
Collect data from form correctly
Remove selcted image for upload
Add image gallery where all uploaded images can be found
integrate data to backend api
update error handling on backend for attributes and product categories
*/

export const categorySchema = z.object({
    name: z.string({required_error: "Category name required"}),
    branch_id: z.string(),
})

export const subcategorySchema = z.object({
    name: z.string({required_error: "Sub Category name required"}),
    parent_category_id: z.string({required_error: "Parent category required"}),
    branch_id: z.string(),
})

export const attributeSchema = z.object({
    name: z.string({required_error: "Attribute name required"}),
    values: z.string({required_error: "Attribute values are required"}),
    branch_id: z.string(),
})