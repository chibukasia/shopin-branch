"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { reportsTableColumns } from "./columns";
import { ReportData } from "../types";

// Dummy data for reports
const dummyReports: ReportData[] = [
  {
    id: "1",
    title: "Monthly Sales Report",
    type: "sales",
    generatedDate: "2024-01-15T10:30:00Z",
    period: "January 2024",
    status: "completed",
    fileUrl: "/reports/monthly-sales-jan-2024.pdf",
    summary: {
      totalRevenue: 45230,
      totalOrders: 1247,
      totalCustomers: 892,
      growthRate: 18.5,
    },
  },
  {
    id: "2",
    title: "Inventory Analysis",
    type: "inventory",
    generatedDate: "2024-01-14T14:20:00Z",
    period: "Q4 2023",
    status: "completed",
    fileUrl: "/reports/inventory-analysis-q4-2023.pdf",
    summary: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      growthRate: -5.2,
    },
  },
  {
    id: "3",
    title: "Customer Behavior Report",
    type: "customer",
    generatedDate: "2024-01-13T09:15:00Z",
    period: "December 2023",
    status: "completed",
    fileUrl: "/reports/customer-behavior-dec-2023.pdf",
    summary: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 1245,
      growthRate: 12.3,
    },
  },
  {
    id: "4",
    title: "Financial Summary",
    type: "financial",
    generatedDate: "2024-01-12T11:45:00Z",
    period: "2023 Annual",
    status: "completed",
    fileUrl: "/reports/financial-summary-2023.pdf",
    summary: {
      totalRevenue: 485000,
      totalOrders: 12500,
      totalCustomers: 3200,
      growthRate: 25.8,
    },
  },
  {
    id: "5",
    title: "Performance Metrics",
    type: "performance",
    generatedDate: "2024-01-11T16:30:00Z",
    period: "January 2024",
    status: "generating",
    summary: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      growthRate: 0,
    },
  },
  {
    id: "6",
    title: "Weekly Sales Report",
    type: "sales",
    generatedDate: "2024-01-10T13:20:00Z",
    period: "Week 2, January 2024",
    status: "completed",
    fileUrl: "/reports/weekly-sales-w2-jan-2024.pdf",
    summary: {
      totalRevenue: 12500,
      totalOrders: 320,
      totalCustomers: 245,
      growthRate: 8.7,
    },
  },
];

const searchTypes = [
  { label: "Title", value: "title" },
  { label: "Type", value: "type" },
  { label: "Period", value: "period" },
  { label: "Status", value: "status" },
];

const ReportsTable = () => {
  return (
    <div className="bg-white rounded-lg">
      <DataTable 
        data={dummyReports} 
        columns={reportsTableColumns} 
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default ReportsTable;
