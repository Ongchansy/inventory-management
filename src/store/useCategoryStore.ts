import { create } from 'zustand';
import Swal from 'sweetalert2';
import { Category } from '@/types/types';

interface CategoryStore {
    categories: Category[];
    selectedCategory: Category | null;
    mode: 'view' | 'edit' | null;
    isViewSheetOpen: boolean;
    toggleViewSheet: () => void;
    fetchCategories: () => Promise<void>;
    selectCategory: (category: Category, mode: 'view' | 'edit') => void;
    closeViewSheet: () => void;
    createCategory: (newCategory: Category) => Promise<void>;
    updateCategory: (updatedCategory: Category, id: string) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
}

export const UseCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    selectedCategory: null,
    mode: null,
    isViewSheetOpen: false,

    toggleViewSheet: () => set((state) => ({ isViewSheetOpen: !state.isViewSheetOpen })),

    fetchCategories: async () => {
        const response = await fetch('/api/categories');
        const data: Category[] = await response.json();
        set({ categories: data });
    },

    selectCategory: (category: Category, mode: 'view' | 'edit') => set({ selectedCategory: category, mode, isViewSheetOpen: true }),

    closeViewSheet: () => set({ isViewSheetOpen: false, selectedCategory: null, mode: null }),

    createCategory: async (newCategory: Category) => {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });

        if (response.ok) {
            const createdCategory: Category = await response.json();
            set((state) => ({
                categories: [...state.categories, createdCategory],
            }));
            Swal.fire({
                title: 'Category created!',
                text: `Category ${createdCategory.name} has been created.`,
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Failed to create category.',
                icon: 'error',
            });
        }
    },

    updateCategory: async (updatedCategory: Category, id: string) => {
        Swal.fire({
            title: 'Update category',
            text: 'Are you sure you want to update this category?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/categories/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedCategory),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        set((state) => ({
                            categories: state.categories.map((category) => (category.id === id ? data : category)),
                        }));
                        Swal.fire({
                            title: 'Category updated!',
                            text: `Category ${data.name} has been updated.`,
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to update category.',
                            icon: 'error',
                        });
                    });
            }
        });
    },

    deleteCategory: async (categoryId: string) => {
        Swal.fire({
            title: 'Delete category',
            text: 'Are you sure you want to delete this category?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/categories/${categoryId}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        set((state) => ({
                            categories: state.categories.filter((category) => category.id !== categoryId),
                        }));
                        Swal.fire({
                            title: 'Category deleted!',
                            text: `Category has been deleted.`,
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete category.',
                            icon: 'error',
                        });
                    });
            }
        });
    },
}));
