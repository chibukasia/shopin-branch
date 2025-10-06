"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { salesTableColumns } from "./columns";
import { SalesTransaction } from "../types";

// Dummy data for sales transactions
const dummySales: SalesTransaction[] = [
  {
    id: "1",
    orderId: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    productName: "Wireless Headphones",
    quantity: 1,
    unitPrice: 299.99,
    totalAmount: 299.99,
    paymentMethod: "card",
    paymentStatus: "paid",
    transactionDate: "2024-01-15T10:30:00Z",
    salesRep: "Alice Johnson",
    discount: 0,
    tax: 24.00,
  },
  {
    id: "2",
    orderId: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    productName: "Smart Watch",
    quantity: 1,
    unitPrice: 149.50,
    totalAmount: 149.50,
    paymentMethod: "cash",
    paymentStatus: "paid",
    transactionDate: "2024-01-14T14:20:00Z",
    salesRep: "Bob Wilson",
    discount: 10.00,
    tax: 11.16,
  },
  {
    id: "3",
    orderId: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    productName: "Bluetooth Speaker",
    quantity: 2,
    unitPrice: 44.99,
    totalAmount: 89.98,
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    transactionDate: "2024-01-13T09:15:00Z",
    salesRep: "Carol Davis",
    discount: 0,
    tax: 7.20,
  },
  {
    id: "4",
    orderId: "ORD-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@email.com",
    productName: "Gaming Mouse",
    quantity: 1,
    unitPrice: 199.99,
    totalAmount: 199.99,
    paymentMethod: "card",
    paymentStatus: "paid",
    transactionDate: "2024-01-12T11:45:00Z",
    salesRep: "David Brown",
    discount: 20.00,
    tax: 14.40,
  },
  {
    id: "5",
    orderId: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    productName: "USB Cable",
    quantity: 3,
    unitPrice: 25.00,
    totalAmount: 75.00,
    paymentMethod: "card",
    paymentStatus: "refunded",
    transactionDate: "2024-01-11T16:30:00Z",
    salesRep: "Eve Miller",
    discount: 0,
    tax: 6.00,
  },
  {
    id: "6",
    orderId: "ORD-006",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    productName: "Laptop Stand",
    quantity: 1,
    unitPrice: 79.99,
    totalAmount: 79.99,
    paymentMethod: "card",
    paymentStatus: "paid",
    transactionDate: "2024-01-10T13:20:00Z",
    salesRep: "Frank Garcia",
    discount: 0,
    tax: 6.40,
  },
  {
    id: "7",
    orderId: "ORD-007",
    customerName: "Robert Miller",
    customerEmail: "robert.miller@email.com",
    productName: "Mechanical Keyboard",
    quantity: 1,
    unitPrice: 149.99,
    totalAmount: 149.99,
    paymentMethod: "cash",
    paymentStatus: "paid",
    transactionDate: "2024-01-09T15:45:00Z",
    salesRep: "Grace Lee",
    discount: 15.00,
    tax: 10.80,
  },
  {
    id: "8",
    orderId: "ORD-008",
    customerName: "Lisa Garcia",
    customerEmail: "lisa.garcia@email.com",
    productName: "Phone Case",
    quantity: 2,
    unitPrice: 19.99,
    totalAmount: 39.98,
    paymentMethod: "card",
    paymentStatus: "paid",
    transactionDate: "2024-01-08T12:10:00Z",
    salesRep: "Henry Kim",
    discount: 0,
    tax: 3.20,
  },
];

const searchTypes = [
  { label: "Order ID", value: "orderId" },
  { label: "Customer Name", value: "customerName" },
  { label: "Product Name", value: "productName" },
  { label: "Payment Method", value: "paymentMethod" },
  { label: "Payment Status", value: "paymentStatus" },
];

const SalesTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummySales} 
        columns={salesTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default SalesTable;
