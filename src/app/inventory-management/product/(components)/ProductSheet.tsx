import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Product } from '@/types/types';
import { useForm } from 'react-hook-form';
import { UseProductStore } from '@/store/useProductStore';
import InputForm from '@/components/form/InputForm';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ProductSheet: React.FC = () => {
    const { isViewSheetOpen, selectedProduct, mode, closeViewSheet, updateProduct, toggleViewSheet } = UseProductStore();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Product>({
        defaultValues: {
            id: selectedProduct?.id,
            name: selectedProduct?.name,
            description: selectedProduct?.description,
            price: selectedProduct?.price || 0, // Set default value to 0 if undefined
            image: selectedProduct?.image,
            quantity: selectedProduct?.quantity || 0, // Set default value to 0 if undefined
            categoryId: selectedProduct?.categoryId,
            supplierId: selectedProduct?.supplierId,
            userId: selectedProduct?.userId,
        }
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(selectedProduct?.image || null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            setValue('name', selectedProduct.name || '');
            setValue('description', selectedProduct.description || '');
            setValue('price', selectedProduct.price || 0);
            setValue('image', selectedProduct.image || '');
            setValue('quantity', selectedProduct.quantity || 0);
            setValue('categoryId', selectedProduct.categoryId || '');
            setValue('supplierId', selectedProduct.supplierId || '');
            setValue('userId', selectedProduct.userId || '');
            setImagePreview(selectedProduct.image || null);
        }
    }, [selectedProduct, setValue]);

    const handleImageDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setIsImageRemoved(false);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(true);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleImageDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const onSubmit = async (data: Product) => {
        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (isImageRemoved) {
            formData.append('image', ''); // Ensure empty string is added if removed
        }

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('quantity', data.quantity.toString());
        formData.append('categoryId', data.categoryId);
        formData.append('supplierId', data.supplierId);
        formData.append('userId', data.userId);

        try {
            if (mode === 'edit') {
                await updateProduct(formData, selectedProduct?.id || '');
            }
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            reset();
            closeViewSheet();
        }
    };

    return (
        <Sheet open={isViewSheetOpen} onOpenChange={toggleViewSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{mode === 'edit' ? 'Edit Product' : 'View Product Details'}</SheetTitle>
                    <SheetClose onClick={closeViewSheet} />
                </SheetHeader>
                <div className="p-4 space-y-4">
                    {mode === 'view' ? (
                        <div className="space-y-4">
                            <p className="text-gray-700"><strong>Name:</strong> {selectedProduct?.name}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {selectedProduct?.description}</p>
                            <p className="text-gray-700"><strong>Price:</strong> ${selectedProduct?.price?.toFixed(2)}</p>
                            <p className="text-gray-700"><strong>Quantity:</strong> {selectedProduct?.quantity}</p>
                            <p className="text-gray-700"><strong>Category:</strong> {selectedProduct?.categoryId}</p>
                            <p className="text-gray-700"><strong>Supplier:</strong> {selectedProduct?.supplierId}</p>
                            <p className="text-gray-700"><strong>User:</strong> {selectedProduct?.userId}</p>
                            <div>
                                <strong>Image</strong>
                                {imagePreview && (
                                    <Image src={imagePreview} width={200} height={200} className="w-24 h-24" alt="Product Image" />
                                )}
                            </div>
                        </div>
                    ) : mode === 'edit' ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Product Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Description"
                                    name="description"
                                    placeholder="Enter Product Description"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="number"
                                    register={register}
                                    label="Quantity"
                                    name="quantity"
                                    placeholder="Enter Product Quantity"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Category"
                                    name="categoryId"
                                    placeholder="Enter Product Category"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Supplier"
                                    name="supplierId"
                                    placeholder="Enter Product Supplier"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="User"
                                    name="userId"
                                    placeholder="Enter Product User"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="number"
                                    register={register}
                                    label="Price"
                                    name="price"
                                    placeholder="Enter Product Price"
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
                                className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                            >
                                {mode === 'edit' ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProductSheet;
