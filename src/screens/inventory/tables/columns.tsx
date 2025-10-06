/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { InventoryItem } from "../types";

export const inventoryTableColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Product" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <img
          src={row.original.productImage}
          alt={row.original.productName}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium">{row.original.productName}</p>
          <p className="text-sm text-gray-500">SKU: {row.original.sku}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Category" column={column} />
    ),
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Current Stock" column={column} />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.currentStock}</p>
        <p className="text-sm text-gray-500">
          Min: {row.original.minimumStock} | Max: {row.original.maximumStock}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "stockStatus",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Status" column={column} />
    ),
    cell: ({ row }) => {
      const status = row.original.stockStatus;
      const statusColors = {
        in_stock: "bg-green-100 text-green-800",
        low_stock: "bg-yellow-100 text-yellow-800",
        out_of_stock: "bg-red-100 text-red-800",
      };
      
      const statusLabels = {
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock",
      };
      
      return (
        <Badge className={statusColors[status]}>
          {statusLabels[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "unitCost",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Unit Cost" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.unitCost.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Selling Price" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.sellingPrice.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Location" column={column} />
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Supplier" column={column} />
    ),
    cell: ({ row }) => (
      <p>{row.original.supplier || "N/A"}</p>
    ),
  },
  {
    accessorKey: "lastRestocked",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Last Restocked" column={column} />
    ),
    cell: ({ row }) => (
      <p>
        {row.original.lastRestocked 
          ? new Date(row.original.lastRestocked).toLocaleDateString()
          : "Never"
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
      const item = row.original;
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Link href={`inventory/edit/${row.original.id}`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              // Handle delete inventory item
              console.log("Delete inventory item:", row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={item.productName}
            description={`SKU ${item.sku} • ${item.category}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{item.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Stock</p>
                  <p className="font-medium">{item.currentStock} (Min {item.minimumStock} / Max {item.maximumStock})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prices</p>
                  <p className="font-medium">Cost ${item.unitCost.toFixed(2)} • Price ${item.sellingPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-medium">{item.supplier || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Restocked</p>
                  <p className="font-medium">{item.lastRestocked ? new Date(item.lastRestocked).toLocaleDateString() : "Never"}</p>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
