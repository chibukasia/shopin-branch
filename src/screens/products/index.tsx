import ActionButton from "@/components/atoms/buttons/ActionButton";
import ProductTable from "./tables/ProductTable";
import Link from "next/link";
import StatsCard from "@/components/molecules/cards/StatsCard";

const ProductScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Products</h2>
        <Link href={"/products/add-product"}>
          <ActionButton title="Add New Product" />
        </Link>
      </div>
      <div className="py-3 grid gap-5">
          <div className="flex gap-4">
              <StatsCard
                title={"1"}
                subTitle={'Active'}
                description="9 Active Products"
              />
          <StatsCard
                title={"1"}
                subTitle={'In Stock'}
                description="9 In Stock Products"
              />
               <StatsCard
                title={"8"}
                subTitle={'Out of Stock'}
                description="9 Out of stock Products"
              />
               <StatsCard
                title={"0"}
                subTitle={'Low on Stock'}
                description="9 Low on stock Products"
              />
          </div>
        
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductScreen;
