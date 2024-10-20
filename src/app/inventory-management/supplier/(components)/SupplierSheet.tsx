import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Supplier } from '@/types/types';
import { useForm } from 'react-hook-form';
import { useSupplierStore } from '@/store/useSupplierStore';
import InputForm from '@/components/form/InputForm';

const SupplierSheet: React.FC = () => {
    const { isViewSheetOpen, selectedSupplier, mode, closeViewSheet, updateSupplier, toggleViewSheet } = useSupplierStore();

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Supplier>({
        defaultValues: {
            id: selectedSupplier?.id,
            name: selectedSupplier?.name,
            contactInfo: selectedSupplier?.contactInfo,
            image: selectedSupplier?.image,
        }
    });

    const id = selectedSupplier?.id || '';

    const onSubmit = (data: Supplier) => {
        updateSupplier(data, id); // Update the supplier in the store
        reset(); // Reset form fields after submission
        closeViewSheet(); // Close sheet after update
    };

    return (
        <Sheet open={isViewSheetOpen} onOpenChange={toggleViewSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{mode === 'edit' ? 'Edit Supplier' : 'View Supplier Details'}</SheetTitle>
                    <SheetClose onClick={closeViewSheet} />
                </SheetHeader>
                <div className="p-4 space-y-4">
                    {mode === 'view' ? (
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                <strong>Name:</strong> {selectedSupplier?.name}
                            </p>
                            <div>
                                <strong className="mb-4">Image</strong>
                                <img src={selectedSupplier?.image} className="w-24 h-24" alt="" />
                            </div>
                            <p className="text-gray-700">
                                <strong>Contact Info:</strong> {selectedSupplier?.contactInfo}
                            </p>
                        </div>
                    ) : mode === 'edit' ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Supplier Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedSupplier?.name}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Contact Info"
                                    name="contactInfo"
                                    placeholder="Enter Contact Info"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedSupplier?.contactInfo}
                                />
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

export default SupplierSheet;

