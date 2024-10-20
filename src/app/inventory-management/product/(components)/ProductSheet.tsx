"use client";
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Product } from '@/types/types';
import { Controller, useForm } from 'react-hook-form';
import InputForm from '@/components/form/InputForm';
import { UseProductStore } from '@/store/useProductStore';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UseCategoryStore } from '@/store/useCategoryStore';
import { UseSupplierStore } from '@/store/useSupplierStore';
import { UseUserStore } from '@/store/useTransactionStore';
import Image from 'next/image';

const ProductSheet: React.FC = () => {
    const { isViewSheetOpen, selectedProduct, mode, closeViewSheet, updateProduct, toggleViewSheet } = UseProductStore();
    const {categories, fetchCategories, selectCategory} = UseCategoryStore()
  const {suppliers, fetchSuppliers} = UseSupplierStore()
  const {users, fetchUsers} = UseUserStore()

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Product>({
        defaultValues: selectedProduct ? {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
            description: selectedProduct.description,
            image: selectedProduct.image,
            categoryId: selectedProduct.categoryId,
            supplierId: selectedProduct.supplierId,
            userId: selectedProduct.userId,
        } : {},
    });

    const id = selectedProduct?.id || '';

    const onSubmit = (data: Product) => {
        updateProduct(data, id);
        reset();
        closeViewSheet();
    };

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchUsers();
  }, [fetchCategories, fetchSuppliers, fetchUsers]);

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
                            <p className="text-gray-700">
                                <strong>Name:</strong> {selectedProduct?.name}
                            </p>
                            <div>
                                <strong className="mb-4">Image</strong>
                                {
                                    selectedProduct?.image ? (
                                        <Image 
                                        src={selectedProduct?.image}
                                        alt={selectedProduct?.name}
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                         />
                                    ) : (
                                        <p className="text-gray-700">No Image</p>
                                    )
                                }
                            </div>
                            <p className="text-gray-700">
                                <strong>Price:</strong> ${selectedProduct?.price}
                            </p>
                            <p className="text-gray-700">
                                <strong>Quantity:</strong> {selectedProduct?.quantity}
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
                                    placeholder="Enter Product Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedProduct?.name}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Price"
                                    name="price"
                                    placeholder="Enter Price"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedProduct?.price.toLocaleString()}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Quantity"
                                    name="quantity"
                                    placeholder="Enter Quantity"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedProduct?.quantity.toLocaleString()}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Description"
                                    name="description"
                                    placeholder="Enter Description"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedProduct?.description}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Image URL"
                                    name="image"
                                    placeholder="Enter Image URL"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedProduct?.image}
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
                                                <SelectItem key={category.id} defaultValue={category.name} value={category.id} className="capitalize">
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
                                        <SelectValue placeholder="Select Supplier" />
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
                                {errors.supplierId && <p className="text-red-600 text-xs">supplier is required</p>}
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
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.username}
                                            </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                )}
                                />
                                {errors.userId && <p className="text-red-600 text-xs">user is required</p>}
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

export default ProductSheet;

