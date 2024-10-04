"use client";
import { UseUserStore } from '@/store/useUserStore';
import React, { useEffect, useMemo } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { User } from '@/types/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

const UserTable = () => {
    const { users, fetchUsers, selectUser, selectedUser, isViewSheetOpen, closeViewSheet } = UseUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <button
                        title='View user'
                        type="button"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => selectUser(row.original, null)}
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                ),
            },
        ],
        [selectUser]
    );

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* ShadCN Sheet for Viewing User */}
            {isViewSheetOpen && (
                <Sheet open={isViewSheetOpen} onOpenChange={closeViewSheet}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>View User Details</SheetTitle>
                            <SheetClose />
                        </SheetHeader>
                        <div className="p-4 space-y-4">
                            <div className="text-lg font-bold text-gray-700">Name: {selectedUser?.username}</div>
                            <div className="text-md text-gray-600">Email: {selectedUser?.email}</div>
                            {/* Add more user details here as necessary */}
                            <div className="text-sm text-gray-500">
                                {/* Example additional details */}
                                {/* Role: {selectedUser?.role} */}
                                {/* Joined: {new Date(selectedUser?.createdAt).toLocaleDateString()} */}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
};

export default UserTable;
