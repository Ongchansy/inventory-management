import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Supplier } from '@/types/types';
import { useForm } from 'react-hook-form';
import { UseSupplierStore } from '@/store/useSupplierStore';
import InputForm from '@/components/form/InputForm';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

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

    const [imageFile, setImageFile] = useState<File | null>(null);
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

    const handleImageDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setIsImageRemoved(false);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(true); // Mark the image as removed
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleImageDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const onSubmit = async (data: Supplier) => {
        const formData = new FormData();
        // Include the new image file or set image to null if removed
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (isImageRemoved) {
            formData.append('image', ''); // Ensure empty string is added if removed
        }
    
        formData.append('name', data.name);
        formData.append('contactInfo', data.contactInfo);
    
        try {
            if (mode === 'edit') {
                await updateSupplier(formData, selectedSupplier?.id || '');
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
                                    <div className="relative">
                                        <Image
                                            src={imagePreview}
                                            width={100}
                                            height={100}
                                            className="w-24 h-24 object-cover rounded-md"
                                            alt="Selected image preview"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-1 hover:bg-gray-100"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        {...getRootProps()}
                                        className="border-2 border-dashed p-4 rounded-md cursor-pointer text-gray-500 hover:border-blue-500 hover:bg-gray-50"
                                    >
                                        <input {...getInputProps()} />
                                        {isDragActive ? (
                                            <p>Drop the files here ...</p>
                                        ) : (
                                            <p>Drag and drop an image here, or click to select</p>
                                        )}
                                    </div>
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
