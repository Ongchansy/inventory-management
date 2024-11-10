import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Supplier } from '@/types/types';
import { useForm } from 'react-hook-form';
import { UseSupplierStore } from '@/store/useSupplierStore';
import InputForm from '@/components/form/InputForm';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { UploadDropzone } from '@/util/uploadthing';
import { Label } from '@/components/ui/label';

const SupplierSheet: React.FC = () => {
    const { isViewSheetOpen, selectedSupplier, mode, closeViewSheet, updateSupplier, toggleViewSheet } = UseSupplierStore();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Supplier>({
        defaultValues: {
            id: selectedSupplier?.id,
            name: selectedSupplier?.name,
            contactInfo: selectedSupplier?.contactInfo,
            image: selectedSupplier?.image,
        }
    });

    const [imagePreview, setImagePreview] = useState<string | null>(selectedSupplier?.image || null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);

    useEffect(() => {
        if (selectedSupplier) {
            setValue('name', selectedSupplier.name || '');
            setValue('contactInfo', selectedSupplier.contactInfo || '');
            setValue('image', selectedSupplier.image || '');
            setImagePreview(selectedSupplier.image || null);
        }
    }, [selectedSupplier, setValue]);

    const handleRemoveImage = () => {
        setValue('image', '');
        setImagePreview(null);
        setIsImageRemoved(true); // Mark the image as removed
    };

    const onSubmit = async (data: Supplier) => {
        try {
            if (mode === 'edit') {
                await updateSupplier(data, selectedSupplier?.id || '');
            }
        } catch (error) {
            console.error("Error updating supplier:", error);
        } finally {
            reset();
            closeViewSheet();
        }
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
                                <strong>Image</strong>
                                {imagePreview && (
                                    <Image src={imagePreview} width={200} height={200} className="w-24 h-24" alt="Supplier Image" />
                                )}
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
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                {imagePreview && !isImageRemoved ? (
                                    <div className="mt-2">
                                        <Image src={imagePreview} alt="Image Preview" width={100} height={100} />
                                        <button type="button" onClick={handleRemoveImage} className="text-red-500 mt-2">
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                        const fileUrl = res?.[0].url;
                                        if (fileUrl) {
                                            setValue("image", fileUrl);
                                        }
                                        }}
                                        onUploadError={(error: Error) => {
                                        console.log(`Error: ${error.message}`);
                                        }}
                                        onUploadProgress={(progress) => {
                                        console.log(`Upload Progress: ${progress}%`);
                                        }}
                                    />
                                )}
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
