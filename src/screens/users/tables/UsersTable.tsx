"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { usersTableColumns } from "./columns";
import { User } from "../types";

// Dummy data for users
const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    role: "customer",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T10:30:00Z",
    totalOrders: 12,
    totalSpent: 1250.50,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1234567891",
    role: "staff",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2023-12-15T00:00:00Z",
    lastLogin: "2024-01-15T09:15:00Z",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1234567892",
    role: "customer",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2024-01-10T00:00:00Z",
    lastLogin: "2024-01-14T16:45:00Z",
    totalOrders: 5,
    totalSpent: 450.75,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1234567893",
    role: "admin",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2023-11-01T00:00:00Z",
    lastLogin: "2024-01-15T08:30:00Z",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1234567894",
    role: "customer",
    status: "inactive",
    avatar: "/placeholder.jpg",
    joinDate: "2023-10-15T00:00:00Z",
    lastLogin: "2024-01-05T14:20:00Z",
    totalOrders: 3,
    totalSpent: 180.25,
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1234567895",
    role: "customer",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2024-01-08T00:00:00Z",
    lastLogin: "2024-01-15T12:10:00Z",
    totalOrders: 8,
    totalSpent: 675.00,
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert.miller@email.com",
    phone: "+1234567896",
    role: "staff",
    status: "active",
    avatar: "/placeholder.jpg",
    joinDate: "2023-09-20T00:00:00Z",
    lastLogin: "2024-01-15T07:45:00Z",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "8",
    name: "Lisa Garcia",
    email: "lisa.garcia@email.com",
    phone: "+1234567897",
    role: "customer",
    status: "suspended",
    avatar: "/placeholder.jpg",
    joinDate: "2023-12-01T00:00:00Z",
    lastLogin: "2024-01-10T11:30:00Z",
    totalOrders: 2,
    totalSpent: 95.50,
  },
];

const searchTypes = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Role", value: "role" },
  { label: "Status", value: "status" },
];

const UsersTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummyUsers} 
        columns={usersTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default UsersTable;
