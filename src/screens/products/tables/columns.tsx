/* eslint-disable @next/next/no-img-element */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productsTableColumns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableHeaderColumn title="Product Image" column={column} />
    ),
    accessorKey: "primary_image",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Link href={''}>
            <img
            src={row.original.primary_image}
            alt={row.original.name}
            className="w-20 h-20 rounded-lg"
            />
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Name" column={column} />
    ),
  },
  {
    accessorKey: "inventory.quantity",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Quantity" column={column} />
    ),
  },
  {
    accessorKey: "inventory.stock_status",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Stock Status" column={column} />
    ),
    cell({ row }) {
      let status = "";
      const stockStatus = row.original.inventory.stock_status;
      switch (stockStatus) {
        case "in_stock":
          status = "In Stock";
          break;
        case "out_of_stock":
          status = "Out Of Stock";
          break;
        case "low_on_stock":
          status = "Low on Stock";
          break;

        default:
          status = "Sold";
          break;
      }
      return <p>{status}</p>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Price" column={column} />
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Primary Category" column={column} />
    ),
    cell: ({ row }) => <p>{row.original.categories[0].name}</p>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn title="Actions" column={column} />
    ),
    cell: ({}) => {
      return (
        <div className="flex gap-3 items-center">
          <MdRemoveRedEye size={'20'} className="text-primary cursor-pointer"/>
          <BiEdit size={'20'} className="text-primary cursor-pointer"/>
          <RiDeleteBin6Line size={'20'} color="red" className="cursor-pointer"/>
        </div>
      );
    },
  },
];
