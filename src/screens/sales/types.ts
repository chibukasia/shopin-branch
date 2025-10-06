export interface SalesTransaction {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionDate: string;
  salesRep?: string;
  discount?: number;
  tax?: number;
}

export interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface SalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingProduct: string;
  revenueGrowth: number;
  orderGrowth: number;
}
