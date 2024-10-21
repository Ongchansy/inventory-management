import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Category } from '@/types/types';
import { useForm } from 'react-hook-form';
import InputForm from '@/components/form/InputForm';
import { UseCategoryStore } from '@/store/useCategoryStore';

const CategorySheet: React.FC = () => {
    const { isViewSheetOpen, selectedCategory, mode, closeViewSheet, updateCategory, toggleViewSheet } = UseCategoryStore();

    const { register, handleSubmit, reset, setValue , formState: { errors } } = useForm<Category>({
        defaultValues: {
            id: selectedCategory?.id,
            name: selectedCategory?.name,
            description: selectedCategory?.description,
        },
    });

    const id = selectedCategory?.id || '';

     // When the form is opened, set the values dynamically
     if (selectedCategory) {
        setValue('name', selectedCategory.name || '');
        setValue('description', selectedCategory.description || '');
    }


    const onSubmit = (data: Category) => {
        updateCategory(data, id);
        reset();
        closeViewSheet();
    };
    
    return (
        <Sheet open={isViewSheetOpen} onOpenChange={toggleViewSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{mode === 'edit' ? 'Edit Category' : 'View Category Details'}</SheetTitle>
                    <SheetClose onClick={closeViewSheet} />
                </SheetHeader>
                <div className="p-4 space-y-4">
                    {mode === 'view' ? (
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                <strong>Name:</strong> {selectedCategory?.name}
                            </p>
                            <p className="text-gray-700">
                                <strong>Description:</strong> {selectedCategory?.description}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputForm
                                    type="text"
                                    register={register}
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Category Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    defaultValue={selectedCategory?.name}
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
                                    defaultValue={selectedCategory?.description}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Save
                            </button>
                        </form>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CategorySheet;

