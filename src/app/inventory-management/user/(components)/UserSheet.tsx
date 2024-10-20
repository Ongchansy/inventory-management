import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { User } from '@/types/types';
import { UseUserStore } from '@/store/useUserStore';
import { Controller, useForm } from 'react-hook-form';
import InputForm from '@/components/form/InputForm';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const UserSheet: React.FC = () => {
    const { isViewSheetOpen, selectedUser, mode, closeViewSheet, updateUser,toggleViewSheet } = UseUserStore();

    // Initialize the form with default values based on the selected user
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<User>({
        defaultValues: {
            id: selectedUser?.id,
            username: selectedUser?.username,
            email: selectedUser?.email,
            password: selectedUser?.password,
            role: selectedUser?.role,
        },
    });

    //extract id from selectedUser
    const id = selectedUser?.id || '';
    

    // Handle form submission for updating the user
    const onSubmit = (data: User) => {
        updateUser(data, id); // Update the user in the store
        reset(); // Reset form fields after submission
        closeViewSheet(); // Close sheet after update
    };

    return (
        <Sheet open={isViewSheetOpen} onOpenChange={toggleViewSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{mode === 'edit' ? 'Edit User' : 'View User Details'}</SheetTitle>
                    <SheetClose onClick={closeViewSheet} />
                </SheetHeader>
                <div className="p-4 space-y-4">
                    {mode === 'view' ? (
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                <strong>Name:</strong> {selectedUser?.username}
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong> {selectedUser?.email}
                            </p>
                            <p className="text-gray-700">
                                <strong>Role:</strong> {selectedUser?.role}
                            </p>
                        </div>
                    ) : mode === 'edit' ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputForm 
                                    type="text"
                                    register={register}
                                    label="Name"
                                    name="username"
                                    placeholder="Enter Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedUser?.username}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="email"
                                    register={register}
                                    label="Email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedUser?.email}
                                />
                            </div>
                            <div>
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedUser?.password}
                                />
                            </div>

                            <div className="mt-4">

                                <Controller
                                name="role"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={onChange} defaultValue={selectedUser?.role} value={value}>
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                                {errors.role && <p className="text-red-600 text-xs">Role is required</p>}
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Save
                            </button>
                        </form>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserSheet;
