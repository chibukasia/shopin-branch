"use client"
import { useParams,  } from "next/navigation";
import useUserStore from "../hooks/useUserStore";
import AddProductForm from "./forms/AddProductForm";
import SideForm from "./forms/SideForm";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/axios-client";

const AddProductScreen = () => {
    const [productData, setProductData] = useState()
    const {user} = useUserStore(state => state)
    const {id} = useParams();


    useEffect(() => {
        if(id){
            axiosClient.get(`/products/${id}/`)
            .then((res) => {
                setProductData(res.data)
            }
            )
            .catch((err) => {
                console.log(err)
            }
            )
        }
    }, [id])
    return(
        <div>
        {user && <div className="flex justify-between gap-4">
            <div className="w-2/3">
            {productData ? (<AddProductForm branchId={user.branch.id} productData={productData}/>): (
                <AddProductForm branchId={user.branch.id} />
            )}
              
            </div>
            <div className="w-1/3">
                <SideForm branchId={user.branch.id}/>
            </div>
            
        </div>}
        </div>
    )
};

export default AddProductScreen;