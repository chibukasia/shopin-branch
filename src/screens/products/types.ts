import { z } from "zod"
import { categorySchema, productSchema, subcategorySchema } from "./forms/product-schema"

export type EAttribute = {
    name: string,
    values: string[],
    branch_id: string
}
export type EProductCategory = z.infer<typeof categorySchema>
export type EProductSubCategory = z.infer<typeof subcategorySchema>

export type EProduct = Partial<z.infer<typeof productSchema>>& {categories: string[], branch_id: string} 