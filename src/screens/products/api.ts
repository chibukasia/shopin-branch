import axiosClient from "@/utils/axios-client";
import { EProductCategory, EProductSubCategory, EAttribute, EProduct } from './types';

export const createAttribute = async(data: EAttribute) => {
    const response = await axiosClient.post('/products/attributes/', data)
    return response.data
}

export const createProductCategory = async (data: EProductCategory | EProductSubCategory) => {
    const response = await axiosClient.post('/products/product-categories/', data)
    return response.data
}

export const fetchAttributes = async (id: string) => {
    const response = await axiosClient.get(`/products/attributes/${id}`)
    return response.data
}

export const fetchProductCategories = async(id: string) => {
    const response = await axiosClient.get(`/products/product-categories/${id}/`)
    return response.data
}

export const createProduct = async (data: EProduct) =>{
    const response = await axiosClient.post('/products/', data)
    return response.data
}

export const fetchBranchProducts = async(branchId: string) => {
    const response = await axiosClient.get(`/products/branch/${branchId}/`)
    return response.data
}

export const updateProduct = async (id: string, data: EProduct) => {
    const response = await axiosClient.put(`/products/${id}/`, data)
    return response.data
}

export const deleteProduct = async (id: string) => {
    const response = await axiosClient.patch(`/products/${id}/delete`)
    return response.data
}

export const fetchProductDetails = async (id: string) => {
    const response = await axiosClient.get(`/products/${id}/`)
    return response.data
}