"use client";
import React, { useEffect } from 'react';
import { Supplier } from '@/types/types';
import { DataTable } from '../../../../components/dashboard/DataTable';
import { SupplierColumns } from './column';
import SupplierSheet from '../(components)/SupplierSheet';
import { UseSupplierStore } from '@/store/useSupplierStore';


const SupplierTable = () => {
    const { suppliers, fetchSuppliers, selectSupplier} = UseSupplierStore()

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    // Map users data with the selectUser function
    const supplierData = suppliers.map((item:any) => ({
        ...item,
        selectSupplier,
    }));

    return (
        <>
            {/* Pass columns and data as props */}
            <DataTable<Supplier> data={supplierData} columns={SupplierColumns} filterColumn='name'/>

            {/* ShadCN Sheet for Viewing User */}
            <SupplierSheet/>
        </>
    );
};

export default SupplierTable;