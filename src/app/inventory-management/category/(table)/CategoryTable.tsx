"use client";
import React, { useEffect } from 'react';
import { DataTable } from '../../../../components/dashboard/DataTable';
import { UseCategoryStore } from '@/store/useCategoryStore';
import { categoryColumns } from './column';
import CategorySheet from '../(components)/CategorySheet';
import { Category } from '@/types/types';


const CategoryTable = () => {
    const {categories, fetchCategories, selectCategory} = UseCategoryStore()

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Map users data with the selectUser function
    const categoryData = categories.map((category:any) => ({
        ...category,
        selectCategory,
    }));

    return (
        <>
            {/* Pass columns and data as props */}
            <DataTable<Category> data={categoryData} columns={categoryColumns} filterColumn='name'/>

            {/* ShadCN Sheet for Viewing User */}
            <CategorySheet />
        </>
    );
};

export default CategoryTable;