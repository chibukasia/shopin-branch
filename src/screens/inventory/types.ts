export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitCost: number;
  sellingPrice: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestocked?: string;
  supplier?: string;
  location: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  date: string;
  performedBy: string;
  reference?: string; // Order ID, PO number, etc.
}
