/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { ReportData } from "../types";
import { FaDownload, FaFileAlt } from "react-icons/fa";

export const reportsTableColumns: ColumnDef<ReportData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Report Title" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaFileAlt className="text-blue-600" />
        <span className="font-medium">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Type" column={column} />
    ),
    cell: ({ row }) => {
      const type = row.original.type;
      const typeColors = {
        sales: "bg-green-100 text-green-800",
        inventory: "bg-blue-100 text-blue-800",
        customer: "bg-purple-100 text-purple-800",
        financial: "bg-yellow-100 text-yellow-800",
        performance: "bg-red-100 text-red-800",
      };
      
      return (
        <Badge className={typeColors[type]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "period",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Period" column={column} />
    ),
  },
  {
    accessorKey: "generatedDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Generated" column={column} />
    ),
    cell: ({ row }) => (
      <p>{new Date(row.original.generatedDate).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Status" column={column} />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        completed: "bg-green-100 text-green-800",
        generating: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
      };
      
      return (
        <Badge className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "summary.totalRevenue",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Revenue" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.summary.totalRevenue.toLocaleString()}</p>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Actions" column={column} />
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const report = row.original;
      
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          {report.fileUrl && (
            <button onClick={() => window.open(report.fileUrl, '_blank')}>
              <FaDownload size={"20"} className="text-green-600 cursor-pointer" />
            </button>
          )}
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={report.title}
            description={`${report.type} report for ${report.period}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Report Type</p>
                  <p className="font-medium capitalize">{report.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Period</p>
                  <p className="font-medium">{report.period}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Generated</p>
                  <p className="font-medium">{new Date(report.generatedDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{report.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Summary</p>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Revenue:</span>
                    <span className="font-medium">${report.summary.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Orders:</span>
                    <span className="font-medium">{report.summary.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Customers:</span>
                    <span className="font-medium">{report.summary.totalCustomers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Growth Rate:</span>
                    <span className={`font-medium ${report.summary.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {report.summary.growthRate >= 0 ? '+' : ''}{report.summary.growthRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
