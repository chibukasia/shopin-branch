export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  status: 'active' | 'inactive' | 'suspended';
  category: string;
  rating: number;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  paymentTerms: string;
  notes?: string;
  website?: string;
  taxId?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SupplierProduct {
  id: string;
  supplierId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  minimumOrder: number;
  leadTime: number; // in days
  isActive: boolean;
}
