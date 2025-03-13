import ProductTable from "./tables/ProductTable";

const ProductScreen = () => {
    return(
        <div>
            <h2 className="font-bold text-xl py-2">Products</h2>
            <div>
                <ProductTable />
            </div>
        </div>
    )
};

export default ProductScreen;