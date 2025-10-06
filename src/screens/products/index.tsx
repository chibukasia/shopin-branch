import ActionButton from "@/components/atoms/buttons/ActionButton";
import ProductTable from "./tables/ProductTable";
import Link from "next/link";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaBox, FaCheckCircle, FaExclamationTriangle, FaMinus } from "react-icons/fa";

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
                title={"9"}
                subTitle={'Active'}
                description="Active Products"
                icon={<FaBox className="text-violet-600" />}
                variant="primary"
                trend={{ value: 15.2, period: "last month" }}
              />
          <StatsCard
                title={"6"}
                subTitle={'In Stock'}
                description="In Stock Products"
                icon={<FaCheckCircle className="text-green-600" />}
                variant="success"
                trend={{ value: 8.7, period: "last week" }}
              />
               <StatsCard
                title={"2"}
                subTitle={'Out of Stock'}
                description="Out of stock Products"
                icon={<FaMinus className="text-red-600" />}
                variant="danger"
                trend={{ value: -12.5, period: "last week" }}
              />
               <StatsCard
                title={"1"}
                subTitle={'Low on Stock'}
                description="Low on stock Products"
                icon={<FaExclamationTriangle className="text-amber-600" />}
                variant="warning"
                trend={{ value: -33.3, period: "last week" }}
              />
          </div>
        
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductScreen;
