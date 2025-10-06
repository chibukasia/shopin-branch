/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Order } from "../types";

export const ordersTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Order #" column={column} />
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
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Items" column={column} />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.items.length} items</p>
        <p className="text-sm text-gray-500">
          {row.original.items.reduce((sum, item) => sum + item.quantity, 0)} total
        </p>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Total Amount" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.totalAmount.toFixed(2)}</p>
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
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      
      return (
        <Badge className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Payment" column={column} />
    ),
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus;
      const paymentColors = {
        pending: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800",
      };
      
      return (
        <Badge className={paymentColors[paymentStatus]}>
          {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Order Date" column={column} />
    ),
    cell: ({ row }) => (
      <p>{new Date(row.original.orderDate).toLocaleDateString()}</p>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Actions" column={column} />
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const order = row.original;
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Link href={`orders/edit/${row.original.id}`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              // Handle delete order
              console.log("Delete order:", row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={`Order ${order.orderNumber}`}
            description={`${order.customerName} • ${new Date(order.orderDate).toLocaleString()}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm">{order.customerEmail}</p>
                  <p className="text-sm">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium capitalize">{order.paymentMethod.replace("_"," ")}</p>
                  <p className="text-sm capitalize">Status: {order.paymentStatus}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={it.productImage} alt={it.productName} className="w-10 h-10 rounded" />
                        <div>
                          <p className="font-medium">{it.productName}</p>
                          <p className="text-sm text-muted-foreground">Qty: {it.quantity} • ${it.unitPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${it.totalPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-semibold">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
