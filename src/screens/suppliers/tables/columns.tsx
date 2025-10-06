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
import { Supplier } from "../types";

export const suppliersTableColumns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Supplier" column={column} />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-sm text-gray-500">{row.original.contactPerson}</p>
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Contact" column={column} />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm">{row.original.email}</p>
        <p className="text-sm text-gray-500">{row.original.phone}</p>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Rating" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="font-medium">{row.original.rating.toFixed(1)}</span>
        <span className="text-yellow-500">★</span>
      </div>
    ),
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Orders" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">{row.original.totalOrders}</p>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Total Spent" column={column} />
    ),
    cell: ({ row }) => (
      <p className="font-medium">${row.original.totalSpent.toLocaleString()}</p>
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
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        suspended: "bg-red-100 text-red-800",
      };
      
      return (
        <Badge className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastOrderDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Last Order" column={column} />
    ),
    cell: ({ row }) => (
      <p>
        {row.original.lastOrderDate 
          ? new Date(row.original.lastOrderDate).toLocaleDateString()
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
      const supplier = row.original;
      
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Link href={`suppliers/edit/${row.original.id}`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              // Handle delete supplier
              console.log("Delete supplier:", row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={supplier.name}
            description={`${supplier.category} • ${supplier.contactPerson}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{supplier.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium">{supplier.rating.toFixed(1)}/5.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{supplier.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{supplier.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Terms</p>
                  <p className="font-medium">{supplier.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="font-medium">{supplier.totalOrders}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Address</p>
                <p className="text-sm">
                  {supplier.address.street}, {supplier.address.city}, {supplier.address.state} {supplier.address.zipCode}, {supplier.address.country}
                </p>
              </div>
              {supplier.website && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Website</p>
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {supplier.website}
                  </a>
                </div>
              )}
              {supplier.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{supplier.notes}</p>
                </div>
              )}
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
