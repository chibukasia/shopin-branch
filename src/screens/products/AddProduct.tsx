import AddProductForm from "./forms/AddProductForm";
import SideForm from "./forms/SideForm";

const AddProductScreen = () => {
    return(
        <div className="flex justify-between gap-4">
            <div className="w-2/3">
              <AddProductForm />
            </div>
            <div className="w-1/3">
                <SideForm />
            </div>
            
        </div>
    )
};

export default AddProductScreen;