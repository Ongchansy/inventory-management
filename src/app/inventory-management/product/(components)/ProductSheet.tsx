import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Product } from '@/types/types';
import { Controller, useForm } from 'react-hook-form';
import { UseProductStore } from '@/store/useProductStore';
import InputForm from '@/components/form/InputForm';
import Image from 'next/image';
import { UseCategoryStore } from '@/store/useCategoryStore';
import { UseSupplierStore } from '@/store/useSupplierStore';
import { UseUserStore } from '@/store/useTransactionStore';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {UploadDropzone } from '@/util/uploadthing';

const ProductSheet: React.FC = () => {
    const { isViewSheetOpen, selectedProduct, mode, closeViewSheet, updateProduct, toggleViewSheet } = UseProductStore();
    const {categories, fetchCategories} = UseCategoryStore()
  const {suppliers, fetchSuppliers} = UseSupplierStore()
  const {users, fetchUsers} = UseUserStore()

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<Product>({
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
        fetchCategories();
        fetchSuppliers();
        fetchUsers();
    }, [selectedProduct, setValue, fetchCategories, fetchSuppliers, fetchUsers]);

    const handleRemoveImage = () => {
        setValue('image', '');
        setImagePreview(null);
        setIsImageRemoved(true);
    };

    const onSubmit = async (data: Product) => {
        const updatedProduct = { ...data, price: parseFloat(data.price.toString()), quantity: parseInt(data.quantity.toString()) };

        try {
            if (mode === 'edit') {
                await updateProduct(updatedProduct, selectedProduct?.id || '');
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
            <SheetContent className='max-w-5xl max-h-screen overflow-y-auto'>
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
                            <p className="text-gray-700"><strong>Category:</strong> {selectedProduct?.category?.name}</p>
                            <p className="text-gray-700"><strong>Supplier:</strong> {selectedProduct?.supplier?.name}</p>
                            <p className="text-gray-700"><strong>User:</strong> {selectedProduct?.user?.username}</p>
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
                            <div className="pb-4">
                                <Controller
                                name="categoryId"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={onChange} defaultValue={value} value={value}>
                                    <Label className="text-right">
                                        Category
                                    </Label>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                                {errors.categoryId && <p className="text-red-600 text-xs">Category is required</p>}
                            </div>
                            <div className="pb-4">
                                <Controller
                                name="supplierId"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={onChange} defaultValue={value} value={value}>
                                    <Label className="text-right">
                                        Supplier
                                    </Label>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {suppliers.map((supplier) => (
                                            <SelectItem key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                                {errors.supplierId && <p className="text-red-600 text-xs">Supplier is required</p>}
                            </div>
                            <div className="pb-4">
                                <Controller
                                name="userId"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={onChange} defaultValue={value} value={value}>
                                    <Label className="text-right">
                                        User
                                    </Label>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {users.map((User) => (
                                            <SelectItem key={User.id} value={User.id}>
                                                {User.username}
                                            </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                                {errors.userId && <p className="text-red-600 text-xs">User is required</p>}
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
