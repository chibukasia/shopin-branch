export interface Purchase {
  id: string;
  purchaseOrderNumber: string;
  supplierId: string;
  supplierName: string;
  status: 'pending' | 'ordered' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  totalAmount: number;
  items: PurchaseItem[];
  paymentStatus: 'pending' | 'paid' | 'partial' | 'overdue';
  paymentMethod: 'cash' | 'check' | 'bank_transfer' | 'credit';
  notes?: string;
  createdBy: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
}

export interface PurchaseSummary {
  totalPurchases: number;
  totalAmount: number;
  pendingOrders: number;
  overduePayments: number;
}
