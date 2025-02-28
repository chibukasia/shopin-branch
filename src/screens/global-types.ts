export interface User {
    name: string
    email: string
    id: string
    role: string
    status: string
    createdAt: string
    updatedAt: string
    creater: Creater
    branch: Branch
  }
  
  export interface Creater {
    name: string
    email: string
    id: string
    role: string
    status: string
  }
  
  export interface Branch {
    id: string
    branch_name: string
    description: string
    branch_code: string
    store_id: string
    user_id: string
    operational_hours: OperationalHours
    address: string
    county_or_province: string
    town: string
    createdAt: string
    updatedAt: string
    store: Store
  }
  
  export interface OperationalHours {
    friday_opens: string
    monday_opens: string
    sunday_opens: string
    friday_closes: string
    monday_closes: string
    sunday_closes: string
    tuesday_opens: string
    saturday_opens: string
    thursday_opens: string
    tuesday_closes: string
    saturday_closes: string
    thursday_closes: string
    wednesday_opens: string
    wednesday_closes: string
  }
  
  export interface Store {
    id: string
    store_name: string
    country: string
    documents: string[]
    logo: string
    store_code: string
    description: string
    user_id: string
    createdAt: string
    updatedAt: string
    status: string
  }

  export interface ProductCategory {
    branch_id: string
    id: string
    name: string
    parent_category_id: string | null
    user_id: string
  }
  