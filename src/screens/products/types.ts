import { z } from "zod"
import { attributeSchema, categorySchema, subcategorySchema } from "./forms/product-schema"

export type EAttribute = z.infer<typeof attributeSchema>
export type EProductCategory = z.infer<typeof categorySchema>
export type EProductSubCategory = z.infer<typeof subcategorySchema>