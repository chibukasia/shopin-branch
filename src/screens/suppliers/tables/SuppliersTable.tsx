"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { suppliersTableColumns } from "./columns";
import { Supplier } from "../types";

// Dummy data for suppliers
const dummySuppliers: Supplier[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    contactPerson: "John Smith",
    email: "john@techsupply.com",
    phone: "+1-555-0123",
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA",
    },
    status: "active",
    category: "Electronics",
    rating: 4.5,
    totalOrders: 45,
    totalSpent: 125000,
    lastOrderDate: "2024-01-10T00:00:00Z",
    paymentTerms: "Net 30",
    website: "https://techsupply.com",
    taxId: "12-3456789",
  },
  {
    id: "2",
    name: "GadgetWorld Inc.",
    contactPerson: "Sarah Johnson",
    email: "sarah@gadgetworld.com",
    phone: "+1-555-0456",
    address: {
      street: "456 Innovation Ave",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA",
    },
    status: "active",
    category: "Gaming",
    rating: 4.2,
    totalOrders: 32,
    totalSpent: 89000,
    lastOrderDate: "2024-01-08T00:00:00Z",
    paymentTerms: "Net 15",
    website: "https://gadgetworld.com",
    taxId: "98-7654321",
  },
  {
    id: "3",
    name: "AudioTech Ltd.",
    contactPerson: "Mike Davis",
    email: "mike@audiotech.com",
    phone: "+1-555-0789",
    address: {
      street: "789 Sound Blvd",
      city: "Nashville",
      state: "TN",
      zipCode: "37201",
      country: "USA",
    },
    status: "active",
    category: "Audio",
    rating: 4.8,
    totalOrders: 28,
    totalSpent: 67000,
    lastOrderDate: "2024-01-12T00:00:00Z",
    paymentTerms: "Net 30",
    website: "https://audiotech.com",
    taxId: "45-6789012",
  },
  {
    id: "4",
    name: "GameGear Pro",
    contactPerson: "Lisa Wilson",
    email: "lisa@gamegear.com",
    phone: "+1-555-0321",
    address: {
      street: "321 Gaming St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
    },
    status: "active",
    category: "Gaming",
    rating: 4.3,
    totalOrders: 38,
    totalSpent: 95000,
    lastOrderDate: "2024-01-09T00:00:00Z",
    paymentTerms: "Net 20",
    website: "https://gamegear.com",
    taxId: "78-9012345",
  },
  {
    id: "5",
    name: "CableCorp",
    contactPerson: "David Brown",
    email: "david@cablecorp.com",
    phone: "+1-555-0654",
    address: {
      street: "654 Wire Lane",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA",
    },
    status: "inactive",
    category: "Accessories",
    rating: 3.8,
    totalOrders: 15,
    totalSpent: 25000,
    lastOrderDate: "2023-12-15T00:00:00Z",
    paymentTerms: "Net 30",
    website: "https://cablecorp.com",
    taxId: "23-4567890",
  },
  {
    id: "6",
    name: "ErgoDesk Solutions",
    contactPerson: "Emily Garcia",
    email: "emily@ergodesk.com",
    phone: "+1-555-0987",
    address: {
      street: "987 Comfort Way",
      city: "Denver",
      state: "CO",
      zipCode: "80201",
      country: "USA",
    },
    status: "active",
    category: "Accessories",
    rating: 4.6,
    totalOrders: 22,
    totalSpent: 42000,
    lastOrderDate: "2024-01-11T00:00:00Z",
    paymentTerms: "Net 15",
    website: "https://ergodesk.com",
    taxId: "56-7890123",
  },
];

const searchTypes = [
  { label: "Name", value: "name" },
  { label: "Contact Person", value: "contactPerson" },
  { label: "Category", value: "category" },
  { label: "Status", value: "status" },
];

const SuppliersTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummySuppliers} 
        columns={suppliersTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default SuppliersTable;
