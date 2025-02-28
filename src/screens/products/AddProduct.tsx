"use client"
import useUserStore from "../hooks/useUserStore";
import AddProductForm from "./forms/AddProductForm";
import SideForm from "./forms/SideForm";

const AddProductScreen = () => {
    const {user} = useUserStore(state => state)

    return(
        <div>
        {user && <div className="flex justify-between gap-4">
            <div className="w-2/3">
              <AddProductForm branchId={user.branch.id}/>
            </div>
            <div className="w-1/3">
                <SideForm branchId={user.branch.id}/>
            </div>
            
        </div>}
        </div>
    )
};

export default AddProductScreen;