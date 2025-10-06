/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import Link from "next/link";
import { Purchase } from "../types";

export const purchasesTableColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "purchaseOrderNumber",
    header: ({ column }) => (
      <DataTableHeaderColumn title="PO Number" column={column} />
    ),
  },
  {
    accessorKey: "supplierName",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Supplier" column={column} />
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
          {row.original.items.reduce((sum, item) => sum + item.quantity, 0)} total qty
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
        ordered: "bg-blue-100 text-blue-800",
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
        partial: "bg-blue-100 text-blue-800",
        overdue: "bg-red-100 text-red-800",
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
    accessorKey: "expectedDeliveryDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Expected Delivery" column={column} />
    ),
    cell: ({ row }) => (
      <p>
        {row.original.expectedDeliveryDate 
          ? new Date(row.original.expectedDeliveryDate).toLocaleDateString()
          : "TBD"
        }
      </p>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Actions" column={column} />
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const purchase = row.original;
      
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Link href={`purchases/edit/${row.original.id}`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              // Handle delete purchase
              console.log("Delete purchase:", row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={`Purchase Order ${purchase.purchaseOrderNumber}`}
            description={`${purchase.supplierName} • ${new Date(purchase.orderDate).toLocaleDateString()}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-medium">{purchase.supplierName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{purchase.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p className="font-medium capitalize">{purchase.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">{purchase.paymentMethod.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium">{purchase.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Delivery</p>
                  <p className="font-medium">
                    {purchase.expectedDeliveryDate 
                      ? new Date(purchase.expectedDeliveryDate).toLocaleDateString()
                      : "TBD"
                    }
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {purchase.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-muted p-3 rounded">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {item.quantity}</p>
                        <p className="text-sm">${item.unitCost.toFixed(2)} each</p>
                        <p className="font-semibold">${item.totalCost.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-lg font-semibold">${purchase.totalAmount.toFixed(2)}</p>
              </div>
              {purchase.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{purchase.notes}</p>
                </div>
              )}
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
