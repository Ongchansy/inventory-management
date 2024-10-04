"use client";
import React, { useEffect } from 'react';
import { UseUserStore } from '@/store/useUserStore';
import UserSheet from '@/app/inventory-management/user/(components)/UserSheet';
import { userColumns } from '@/app/inventory-management/user/(table)/column';
import { User } from '@/types/types';
import { DataTable } from '../../../../components/dashboard/DataTable';

const UserTable = () => {
    const { users, fetchUsers, selectUser, selectedUser, isViewSheetOpen, closeViewSheet } = UseUserStore()

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Map users data with the selectUser function
    const userData = users.map((user) => ({
        ...user,
        selectUser,
    }));

    return (
        <>
            {/* Pass columns and data as props */}
            <DataTable<User> data={userData} columns={userColumns} />

            {/* ShadCN Sheet for Viewing User */}
            <UserSheet />
        </>
    );
};

export default UserTable;
