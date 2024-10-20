"use client";
import React, { useEffect } from 'react';
import { Product, User } from '@/types/types';
import { DataTable } from '../../../../components/dashboard/DataTable';
import { productColumns } from './column';
import ProductSheet from '../(components)/ProductSheet';
import { useProductStore } from '@/store/useProductStore';


const ProductTable = () => {
    const { products, fetchProducts, selectProduct} = useProductStore()

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Map users data with the selectUser function
    const productData = products.map((prouct:any) => ({
        ...prouct,
        selectProduct,
    }));

    return (
        <>
            {/* Pass columns and data as props */}
            <DataTable<Product> data={productData} columns={productColumns} filterColumn='name'/>

            {/* ShadCN Sheet for Viewing User */}
            <ProductSheet />
        </>
    );
};

export default ProductTable;