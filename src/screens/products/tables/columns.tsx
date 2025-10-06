/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { fetchProductDetails } from "../api";

type ProductInventory = {
  quantity?: number;
  stock_status?: string;
}

type ProductAttribute = {
  name: string;
  values: string[] | string;
}

type ProductCategory = { name?: string } | string;

type ProductDetails = {
  id?: string;
  name: string;
  price?: number | string;
  primary_image?: string;
  images?: string[];
  sku?: string;
  description?: string;
  attributes?: ProductAttribute[];
  categories?: ProductCategory[];
  inventory?: ProductInventory;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productsTableColumns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableHeaderColumn title="Product Image" column={column} />
    ),
    accessorKey: "primary_image",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Link href={""}>
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
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      const queryClient = useQueryClient()
      const {mutate} = useMutation({
        mutationKey: ["delete-product"],
        mutationFn: (id: string) => {
          return deleteProduct(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          toast.success("Product deleted successfully", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error) => {
          console.log(error);
          toast.error("Error deleting product", {
            position: "top-right",
            duration: 3000,
          });
        },
      })
      return (
        <div className="flex gap-3 items-center">
          <button onClick={() => setOpen(true)}><MdRemoveRedEye size={"20"} className="text-primary cursor-pointer" /></button>
          <Link href={`products/edit-product/${row.original.id}/`}>
            <BiEdit size={"20"} className="text-primary cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            size={"20"}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              mutate( row.original.id);
            }}
          />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            title={row.original.name}
            description={row.original.categories?.[0]?.name}
          >
            {(() => {
              const { data, isLoading } = useQuery({
                queryKey: ["product-details", row.original.id],
                queryFn: () => fetchProductDetails(row.original.id),
                enabled: open,
              });
              if (isLoading) {
                return (
                  <div className="space-y-3">
                    <div className="h-6 w-1/3 bg-muted rounded" />
                    <div className="h-40 w-full bg-muted rounded" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 bg-muted rounded" />
                      <div className="h-16 bg-muted rounded" />
                    </div>
                  </div>
                );
              }
              const product: ProductDetails = (data as ProductDetails) ?? (row.original as ProductDetails);
              return (
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <img src={product.primary_image || row.original.primary_image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">${product.price ?? row.original.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{product.inventory?.quantity ?? row.original.inventory?.quantity ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock Status</p>
                        <p className="font-medium capitalize">{product.inventory?.stock_status ?? row.original.inventory?.stock_status}</p>
                      </div>
                      {product.sku && (
                        <div>
                          <p className="text-sm text-muted-foreground">SKU</p>
                          <p className="font-medium">{product.sku}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {product.images && product.images.length ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Gallery</p>
                      <div className="flex gap-2 overflow-x-auto py-1">
                        {product.images.map((img: string, idx: number) => (
                          <img key={idx} src={img} alt={`image-${idx}`} className="w-16 h-16 rounded object-cover border" />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {product.description && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{product.description}</p>
                    </div>
                  )}
                  {product.attributes && product.attributes.length ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Attributes</p>
                      <div className="grid grid-cols-2 gap-3">
                        {product.attributes.map((attr: ProductAttribute, idx: number) => (
                          <div key={idx} className="text-sm">
                            <span className="text-muted-foreground">{attr.name}: </span>
                            <span className="font-medium">{Array.isArray(attr.values) ? attr.values.join(", ") : String(attr.values)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {product.categories && product.categories.length ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {product.categories.map((c: ProductCategory, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-muted text-xs">{typeof c === 'string' ? c : (c.name ?? '')}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })()}
          </Dialog>
        </div>
      );
    },
  },
];
