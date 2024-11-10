"use client";
import { ImageDropzone } from "@/components/form/ImageDropZone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseCategoryStore } from "@/store/useCategoryStore";
import useModal from "@/store/useModal";
import { UseProductStore } from "@/store/useProductStore";
import { UseSupplierStore } from "@/store/useSupplierStore";
import { UseUserStore } from "@/store/useTransactionStore";
import { Product } from "@/types/types";
import { UploadDropzone } from "@/util/uploadthing";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export function AddProductModal() {
  const { modals, toggleModal, closeModal } = useModal();
  const { createProduct } = UseProductStore();
  const { categories, fetchCategories } = UseCategoryStore();
  const { suppliers, fetchSuppliers } = UseSupplierStore();
  const { users, fetchUsers } = UseUserStore();

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchUsers();
  }, [fetchCategories, fetchSuppliers, fetchUsers]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      quantity: 0,
      categoryId: "",
      supplierId: "",
      userId: "",
    },
  });

  const onSubmit = async (data: Product) => {
    const product = {
      ...data,
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString()),
    };
    await createProduct(product);
    closeModal("product");
    reset();
  };

  return (
    <Dialog open={modals.product} onOpenChange={() => toggleModal("product")}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a new product to the store.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Product name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-600 text-xs">Name is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Product description"
                {...register("description", { required: true })}
              />
              {errors.description && <p className="text-red-600 text-xs">Description is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Price"
                {...register("price", { required: true, min: 0 })}
              />
              {errors.price && <p className="text-red-600 text-xs">Price is required and must be a positive number</p>}
            </div>

            <div className="space-y-2">
              <Controller
                name="categoryId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} defaultValue={value} value={value}>
                    <Label>Category</Label>
                    <SelectTrigger>
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
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="pb-4">
              <Controller
                name="supplierId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} defaultValue={value} value={value}>
                    <Label>Supplier</Label>
                    <SelectTrigger>
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
              {errors.supplierId && <p className="text-red-600 text-xs">Supplier is required</p>}
            </div>
            <div className="pb-4">
              <Controller
                name="userId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} defaultValue={value} value={value}>
                    <Label>User</Label>
                    <SelectTrigger>
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
              {errors.userId && <p className="text-red-600 text-xs">User is required</p>}
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Quantity"
                {...register("quantity", { required: true, min: 0 })}
              />
              {errors.quantity && <p className="text-red-600 text-xs">Quantity is required and must be a positive number</p>}
            </div>
            <div className="col-span-2">
              <Label htmlFor="image">Image</Label>
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
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
