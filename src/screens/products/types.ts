import { z } from "zod"
import { categorySchema, subcategorySchema } from "./forms/product-schema"

export type EAttribute = {
    name: string,
    values: string[],
    branch_id: string
}
export type EProductCategory = z.infer<typeof categorySchema>
export type EProductSubCategory = z.infer<typeof subcategorySchema>