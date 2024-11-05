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
import useModal from "@/store/useModal";
import { UseSupplierStore } from "@/store/useSupplierStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface Supplier {
  id: string;
  name: string;
  image: File | null;
  contactInfo: string;
}

export function AddSupplierModal() {
  const { modals, toggleModal, closeModal } = useModal();
  const { createSupplier, fetchSuppliers } = UseSupplierStore();

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Supplier>({
    defaultValues: {
      id: "",
      name: "",
      image: null,
      contactInfo: "",
    },
  });

  const handleImageDrop = (file: File | null) => {
    setValue("image", file);
  };

  const onSubmit = async (data: Supplier) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contactInfo", data.contactInfo);

    if (data.image) {
      formData.append("image", data.image);
    } else {
      formData.append("image", ""); // Fallback if no image is provided
    }

    await createSupplier(formData);
    closeModal("supplier");
    reset();
  };

  return (
    <Dialog open={modals.supplier} onOpenChange={() => toggleModal("supplier")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogDescription>Add a new supplier to the store.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                placeholder="Supplier name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-600 text-xs">Name is required</p>}
            </div>

            <div>
              <Label htmlFor="image">Image</Label>
              <ImageDropzone onDrop={handleImageDrop} />
              {errors.image && (
                <p className="text-red-600 text-xs">Image is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Input
                id="contactInfo"
                placeholder="Contact Info"
                {...register("contactInfo", { required: true })}
              />
              {errors.contactInfo && (
                <p className="text-red-600 text-xs">Contact Info is required</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Supplier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
