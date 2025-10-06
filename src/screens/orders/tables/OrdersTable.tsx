"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { ordersTableColumns } from "./columns";
import { Order } from "../types";

// Dummy data for orders
const dummyOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+1234567890",
    status: "pending",
    totalAmount: 299.99,
    items: [
      {
        id: "1",
        productId: "prod-1",
        productName: "Wireless Headphones",
        productImage: "/placeholder.jpg",
        quantity: 1,
        unitPrice: 299.99,
        totalPrice: 299.99,
      },
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    orderDate: "2024-01-15T10:30:00Z",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+1234567891",
    status: "processing",
    totalAmount: 149.50,
    items: [
      {
        id: "2",
        productId: "prod-2",
        productName: "Smart Watch",
        productImage: "/placeholder.jpg",
        quantity: 1,
        unitPrice: 149.50,
        totalPrice: 149.50,
      },
    ],
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    orderDate: "2024-01-14T14:20:00Z",
    paymentMethod: "cash",
    paymentStatus: "pending",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+1234567892",
    status: "delivered",
    totalAmount: 89.99,
    items: [
      {
        id: "3",
        productId: "prod-3",
        productName: "Bluetooth Speaker",
        productImage: "/placeholder.jpg",
        quantity: 2,
        unitPrice: 44.99,
        totalPrice: 89.98,
      },
    ],
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    orderDate: "2024-01-13T09:15:00Z",
    deliveryDate: "2024-01-16T16:45:00Z",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@email.com",
    customerPhone: "+1234567893",
    status: "shipped",
    totalAmount: 199.99,
    items: [
      {
        id: "4",
        productId: "prod-4",
        productName: "Gaming Mouse",
        productImage: "/placeholder.jpg",
        quantity: 1,
        unitPrice: 199.99,
        totalPrice: 199.99,
      },
    ],
    shippingAddress: {
      street: "321 Elm St",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA",
    },
    orderDate: "2024-01-12T11:45:00Z",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    customerPhone: "+1234567894",
    status: "cancelled",
    totalAmount: 75.00,
    items: [
      {
        id: "5",
        productId: "prod-5",
        productName: "USB Cable",
        productImage: "/placeholder.jpg",
        quantity: 3,
        unitPrice: 25.00,
        totalPrice: 75.00,
      },
    ],
    shippingAddress: {
      street: "654 Maple Dr",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA",
    },
    orderDate: "2024-01-11T16:30:00Z",
    paymentMethod: "card",
    paymentStatus: "refunded",
  },
];

const searchTypes = [
  { label: "Order Number", value: "orderNumber" },
  { label: "Customer Name", value: "customerName" },
  { label: "Customer Email", value: "customerEmail" },
  { label: "Status", value: "status" },
];

const OrdersTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummyOrders} 
        columns={ordersTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default OrdersTable;
