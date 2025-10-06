/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { SalesTransaction } from "../types";

export const salesTableColumns: ColumnDef<SalesTransaction>[] = [
  {
    accessorKey: "transactionDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Date" column={column} />
    ),
    cell: ({ row }) => (
      <p>{new Date(row.original.transactionDate).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Order ID" column={column} />
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Customer" column={column} />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.customerName}</p>
        <p className="text-sm text-gray-500">{row.original.customerEmail}</p>
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Product" column={column} />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Qty" column={column} />
    ),
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Unit Price" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.unitPrice.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Total" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-semibold">${row.original.totalAmount.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Payment" column={column} />
    ),
    cell: ({ row }) => {
      const method = row.original.paymentMethod;
      const methodColors = {
        cash: "bg-green-100 text-green-800",
        card: "bg-blue-100 text-blue-800",
        bank_transfer: "bg-purple-100 text-purple-800",
      };
      
      return (
        <Badge className={methodColors[method]}>
          {method.charAt(0).toUpperCase() + method.slice(1).replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Status" column={column} />
    ),
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800",
      };
      
      return (
        <Badge className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Actions" column={column} />
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const transaction = row.original;
      
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={`Transaction ${transaction.orderId}`}
            description={`${transaction.customerName} • ${new Date(transaction.transactionDate).toLocaleString()}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{transaction.customerName}</p>
                  <p className="text-sm">{transaction.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium capitalize">{transaction.paymentMethod.replace("_", " ")}</p>
                  <p className="text-sm capitalize">Status: {transaction.paymentStatus}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Product Details</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{transaction.productName}</p>
                  <p className="text-sm">Quantity: {transaction.quantity}</p>
                  <p className="text-sm">Unit Price: ${transaction.unitPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  {transaction.discount && (
                    <p className="text-sm text-muted-foreground">Discount: -${transaction.discount.toFixed(2)}</p>
                  )}
                  {transaction.tax && (
                    <p className="text-sm text-muted-foreground">Tax: ${transaction.tax.toFixed(2)}</p>
                  )}
                </div>
                <p className="text-lg font-semibold">Total: ${transaction.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
