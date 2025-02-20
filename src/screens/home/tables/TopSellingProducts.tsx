"use client"
import DataTable from "@/components/molecules/tables/DataTable"
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader"
import { ColumnDef } from "@tanstack/react-table"

interface TopSellerProduct {
    name: string
    quantity: number
    image: string
    price: number
    total: number
}

const tableColumns: ColumnDef<TopSellerProduct>[] = [
    {
        header: ({column}) => <DataTableHeaderColumn title="Product"  column={column}/>,
        accessorKey: "image",
        cell: ({ row }) => (
            <div className="flex items-center space-x-4">
                <img
                    src={row.original.image}
                    alt={row.original.name}
                    className="w-8 h-8 rounded-full"
                />
            </div>
        ),
    },
    {
        header: ({column}) => <DataTableHeaderColumn title="Name"  column={column}/>,
        accessorKey: "name",
    },
    {
        header: ({column}) => <DataTableHeaderColumn title="Quantity"  column={column}/>,
        accessorKey: "quantity",
    },
    {
        header: ({column}) => <DataTableHeaderColumn title="Price"  column={column}/>,
        accessorKey: "price",
        cell: ({ row }) => <span>KSH {row.original.price}</span>,
    },
    {
        header: ({column}) => <DataTableHeaderColumn title="Total"  column={column}/>,
        accessorKey: "total",
        cell: ({ row }) => <span>${row.original.total}</span>,
    }
]

const TopSellingsProducts = () => {
    return(
        <div>
          <DataTable columns={tableColumns} data={[]}/>
        </div>
    )
}

export default TopSellingsProducts