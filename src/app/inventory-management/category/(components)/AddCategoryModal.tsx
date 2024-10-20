"use client";
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
import { UseCategoryStore } from "@/store/useCategoryStore";
import useModal from "@/store/useModal";
import { Category } from "@/types/types";
import { Controller, useForm } from "react-hook-form";

export function AddCategoryModal() {
  const { modals, toggleModal, closeModal } = useModal();
  const { createCategory } = UseCategoryStore();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Category>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: Category) => {
    await createCategory(data);
    closeModal("category");
    reset();
  };

  return (
    <Dialog open={modals.category} onOpenChange={() => toggleModal("category")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Add a new category to the store.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="Category name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-600 text-xs">Name is required</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Category description"
                {...register("description", { required: true })}
              />
              {errors.description && <p className="text-red-600 text-xs">Description is required</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


