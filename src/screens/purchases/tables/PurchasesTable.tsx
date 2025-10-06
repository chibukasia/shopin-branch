"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { purchasesTableColumns } from "./columns";
import { Purchase } from "../types";

// Dummy data for purchases
const dummyPurchases: Purchase[] = [
  {
    id: "1",
    purchaseOrderNumber: "PO-001",
    supplierId: "1",
    supplierName: "TechSupply Co.",
    status: "delivered",
    orderDate: "2024-01-10T00:00:00Z",
    expectedDeliveryDate: "2024-01-15T00:00:00Z",
    actualDeliveryDate: "2024-01-14T00:00:00Z",
    totalAmount: 12500.00,
    items: [
      {
        id: "1",
        productId: "prod-1",
        productName: "Wireless Headphones",
        sku: "WH-001",
        quantity: 50,
        unitCost: 150.00,
        totalCost: 7500.00,
        receivedQuantity: 50,
      },
      {
        id: "2",
        productId: "prod-2",
        productName: "Smart Watch",
        sku: "SW-002",
        quantity: 30,
        unitCost: 80.00,
        totalCost: 2400.00,
        receivedQuantity: 30,
      },
    ],
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    createdBy: "John Doe",
    notes: "Priority order for Q1 inventory",
  },
  {
    id: "2",
    purchaseOrderNumber: "PO-002",
    supplierId: "2",
    supplierName: "GadgetWorld Inc.",
    status: "shipped",
    orderDate: "2024-01-12T00:00:00Z",
    expectedDeliveryDate: "2024-01-18T00:00:00Z",
    totalAmount: 8900.00,
    items: [
      {
        id: "3",
        productId: "prod-3",
        productName: "Gaming Mouse",
        sku: "GM-003",
        quantity: 25,
        unitCost: 120.00,
        totalCost: 3000.00,
      },
      {
        id: "4",
        productId: "prod-4",
        productName: "Mechanical Keyboard",
        sku: "MK-004",
        quantity: 20,
        unitCost: 80.00,
        totalCost: 1600.00,
      },
    ],
    paymentStatus: "pending",
    paymentMethod: "credit",
    createdBy: "Jane Smith",
  },
  {
    id: "3",
    purchaseOrderNumber: "PO-003",
    supplierId: "3",
    supplierName: "AudioTech Ltd.",
    status: "ordered",
    orderDate: "2024-01-14T00:00:00Z",
    expectedDeliveryDate: "2024-01-20T00:00:00Z",
    totalAmount: 4500.00,
    items: [
      {
        id: "5",
        productId: "prod-5",
        productName: "Bluetooth Speaker",
        sku: "BS-005",
        quantity: 100,
        unitCost: 25.00,
        totalCost: 2500.00,
      },
    ],
    paymentStatus: "partial",
    paymentMethod: "check",
    createdBy: "Mike Johnson",
    notes: "Bulk order for promotional campaign",
  },
  {
    id: "4",
    purchaseOrderNumber: "PO-004",
    supplierId: "4",
    supplierName: "GameGear Pro",
    status: "pending",
    orderDate: "2024-01-15T00:00:00Z",
    expectedDeliveryDate: "2024-01-22T00:00:00Z",
    totalAmount: 3200.00,
    items: [
      {
        id: "6",
        productId: "prod-6",
        productName: "Gaming Headset",
        sku: "GH-006",
        quantity: 40,
        unitCost: 80.00,
        totalCost: 3200.00,
      },
    ],
    paymentStatus: "pending",
    paymentMethod: "bank_transfer",
    createdBy: "Sarah Wilson",
  },
  {
    id: "5",
    purchaseOrderNumber: "PO-005",
    supplierId: "5",
    supplierName: "CableCorp",
    status: "cancelled",
    orderDate: "2024-01-08T00:00:00Z",
    expectedDeliveryDate: "2024-01-12T00:00:00Z",
    totalAmount: 1500.00,
    items: [
      {
        id: "7",
        productId: "prod-7",
        productName: "USB Cable",
        sku: "UC-007",
        quantity: 200,
        unitCost: 5.00,
        totalCost: 1000.00,
      },
    ],
    paymentStatus: "pending",
    paymentMethod: "cash",
    createdBy: "David Brown",
    notes: "Cancelled due to quality issues",
  },
];

const searchTypes = [
  { label: "PO Number", value: "purchaseOrderNumber" },
  { label: "Supplier", value: "supplierName" },
  { label: "Status", value: "status" },
  { label: "Payment Status", value: "paymentStatus" },
];

const PurchasesTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummyPurchases} 
        columns={purchasesTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default PurchasesTable;
