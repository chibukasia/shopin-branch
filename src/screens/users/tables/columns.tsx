/* eslint-disable react-hooks/rules-of-hooks */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { User } from "../types";

export const usersTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableHeaderColumn title="User" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-sm text-gray-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Role" column={column} />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      const roleColors = {
        admin: "bg-red-100 text-red-800",
        staff: "bg-blue-100 text-blue-800",
        customer: "bg-green-100 text-green-800",
      };
      
      return (
        <Badge className={roleColors[role]}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      );
    },
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
      <p className="font-medium">${row.original.totalSpent.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "joinDate",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Join Date" column={column} />
    ),
    cell: ({ row }) => (
      <p>{new Date(row.original.joinDate).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Last Login" column={column} />
    ),
    cell: ({ row }) => (
      <p>
        {row.original.lastLogin 
          ? new Date(row.original.lastLogin).toLocaleDateString()
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
      const user = row.original;
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}>
            <MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" />
          </button>
          <Link href={`users/edit/${row.original.id}`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              // Handle delete user
              console.log("Delete user:", row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={user.name}
            description={`${user.email} • ${user.role}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{user.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="font-medium">{user.totalOrders} • ${user.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              {user.address && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-sm">{user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}, {user.address.country}</p>
                </div>
              )}
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
