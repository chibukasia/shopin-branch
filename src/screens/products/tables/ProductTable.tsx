"use client";
import DataTable from "@/components/molecules/tables/DataTable";
import { productsTableColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/screens/hooks/useUserStore";
import { fetchBranchProducts } from "../api";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductTable = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchBranchProducts(user?.branch.id ?? ""),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-10 rounded-md" />
          {[1, 2, 3, 4, 5].map((index)=>(
            <div className="flex gap-3" key={index}>
            <Skeleton className="w-1/5 h-8 rounded-md" />
            <Skeleton className="w-1/5 h-8 rounded-md" />
            <Skeleton className="w-1/5 h-8 rounded-md" />
            <Skeleton className="w-1/5 h-8 rounded-md" />
            <Skeleton className="w-1/5 h-8 rounded-md" />
          </div>
          ))}
          
        </div>
      ) : (
        <DataTable data={data ?? []} columns={productsTableColumns} />
      )}
    </div>
  );
};

export default ProductTable;
