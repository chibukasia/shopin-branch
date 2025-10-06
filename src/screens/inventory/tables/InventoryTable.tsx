"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { inventoryTableColumns } from "./columns";
import { InventoryItem } from "../types";

// Dummy data for inventory
const dummyInventory: InventoryItem[] = [
  {
    id: "1",
    productId: "prod-1",
    productName: "Wireless Headphones",
    productImage: "/placeholder.jpg",
    sku: "WH-001",
    category: "Electronics",
    currentStock: 45,
    minimumStock: 10,
    maximumStock: 100,
    unitCost: 150.00,
    sellingPrice: 299.99,
    stockStatus: "in_stock",
    lastRestocked: "2024-01-10T00:00:00Z",
    supplier: "TechSupply Co.",
    location: "Warehouse A - Shelf 1",
  },
  {
    id: "2",
    productId: "prod-2",
    productName: "Smart Watch",
    productImage: "/placeholder.jpg",
    sku: "SW-002",
    category: "Electronics",
    currentStock: 8,
    minimumStock: 15,
    maximumStock: 50,
    unitCost: 80.00,
    sellingPrice: 149.50,
    stockStatus: "low_stock",
    lastRestocked: "2024-01-05T00:00:00Z",
    supplier: "GadgetWorld Inc.",
    location: "Warehouse A - Shelf 2",
  },
  {
    id: "3",
    productId: "prod-3",
    productName: "Bluetooth Speaker",
    productImage: "/placeholder.jpg",
    sku: "BS-003",
    category: "Electronics",
    currentStock: 0,
    minimumStock: 5,
    maximumStock: 30,
    unitCost: 25.00,
    sellingPrice: 44.99,
    stockStatus: "out_of_stock",
    lastRestocked: "2023-12-20T00:00:00Z",
    supplier: "AudioTech Ltd.",
    location: "Warehouse B - Shelf 1",
  },
  {
    id: "4",
    productId: "prod-4",
    productName: "Gaming Mouse",
    productImage: "/placeholder.jpg",
    sku: "GM-004",
    category: "Gaming",
    currentStock: 22,
    minimumStock: 8,
    maximumStock: 40,
    unitCost: 120.00,
    sellingPrice: 199.99,
    stockStatus: "in_stock",
    lastRestocked: "2024-01-12T00:00:00Z",
    supplier: "GameGear Pro",
    location: "Warehouse A - Shelf 3",
  },
  {
    id: "5",
    productId: "prod-5",
    productName: "USB Cable",
    productImage: "/placeholder.jpg",
    sku: "UC-005",
    category: "Accessories",
    currentStock: 150,
    minimumStock: 20,
    maximumStock: 200,
    unitCost: 5.00,
    sellingPrice: 25.00,
    stockStatus: "in_stock",
    lastRestocked: "2024-01-08T00:00:00Z",
    supplier: "CableCorp",
    location: "Warehouse B - Shelf 2",
  },
  {
    id: "6",
    productId: "prod-6",
    productName: "Laptop Stand",
    productImage: "/placeholder.jpg",
    sku: "LS-006",
    category: "Accessories",
    currentStock: 3,
    minimumStock: 10,
    maximumStock: 25,
    unitCost: 35.00,
    sellingPrice: 79.99,
    stockStatus: "low_stock",
    lastRestocked: "2023-12-15T00:00:00Z",
    supplier: "ErgoDesk Solutions",
    location: "Warehouse B - Shelf 3",
  },
  {
    id: "7",
    productId: "prod-7",
    productName: "Mechanical Keyboard",
    productImage: "/placeholder.jpg",
    sku: "MK-007",
    category: "Gaming",
    currentStock: 0,
    minimumStock: 5,
    maximumStock: 20,
    unitCost: 80.00,
    sellingPrice: 149.99,
    stockStatus: "out_of_stock",
    lastRestocked: "2023-11-30T00:00:00Z",
    supplier: "KeyMaster Inc.",
    location: "Warehouse A - Shelf 4",
  },
  {
    id: "8",
    productId: "prod-8",
    productName: "Phone Case",
    productImage: "/placeholder.jpg",
    sku: "PC-008",
    category: "Accessories",
    currentStock: 75,
    minimumStock: 15,
    maximumStock: 100,
    unitCost: 8.00,
    sellingPrice: 19.99,
    stockStatus: "in_stock",
    lastRestocked: "2024-01-14T00:00:00Z",
    supplier: "CaseCraft Co.",
    location: "Warehouse B - Shelf 4",
  },
];

const searchTypes = [
  { label: "Product Name", value: "productName" },
  { label: "SKU", value: "sku" },
  { label: "Category", value: "category" },
  { label: "Status", value: "stockStatus" },
  { label: "Location", value: "location" },
];

const InventoryTable = () => {
  return (
    <div className="bg-white rounded-lg overflow-scroll">
      <DataTable 
        data={dummyInventory} 
        columns={inventoryTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default InventoryTable;
