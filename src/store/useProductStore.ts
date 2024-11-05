import { create } from 'zustand';
import Swal from 'sweetalert2';
import { Product, User } from '@/types/types';

interface UserStore {
    products: Product[]
    selectedProduct: Product | null;
    mode: 'view' | 'edit' | null; // Add mode property
    isViewSheetOpen: boolean;
    toggleViewSheet: () => void; // Function to toggle the view sheet
    fetchProducts: () => Promise<void>;
    selectProduct: (product: Product, mode: 'view' | 'edit' | null) => void; // Update selectUser signature
    closeViewSheet: () => void;
    createProduct: (newProduct: FormData) => Promise<void>;
    updateProduct: (updateProduct: FormData, id: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
}

export const UseProductStore = create<UserStore>((set) => ({
    products: [],
    selectedProduct: null,
    mode: null, // Initialize mode
    isViewSheetOpen: false,
    toggleViewSheet: () => set((state) => ({ isViewSheetOpen: !state.isViewSheetOpen })),
    fetchProducts: async () => {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        set({ products: data });
    },

    selectProduct: (product: Product, mode: 'view' | 'edit' | null) => set({ selectedProduct: product, mode }),

    closeViewSheet: () => set({ isViewSheetOpen: false }),
    createProduct: async (newProduct: FormData) => {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: newProduct,
        });

        if (response.ok) {
            const createdProduct: Product = await response.json();
            set((state) => ({
                products: [...state.products, createdProduct],
            }));
            Swal.fire({
                title: 'Product created!',
                text: `Product ${createdProduct.name} has been created.`,
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Failed to create product.',
                icon: 'error',
            });
        }
    },
    updateProduct: async (updateProduct: FormData, id: string) => {
        Swal.fire({
            title: 'Update product',
            text: 'Are you sure you want to update this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    body: updateProduct,
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((updatedProduct) => {
                    // Update the state with the new product data
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.id === id ? { ...product, ...updatedProduct } : product
                        ),
                    }));
                    Swal.fire({
                        title: 'Product updated!',
                        text: `Product has been updated.`,
                        icon: 'success',
                    });
                })
                .catch((error) => {
                    console.error('Update failed:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to update product.',
                        icon: 'error',
                    });
                });
            }
        });
    },
    
    deleteProduct: async (productId: string) => {
        Swal.fire({
            title: 'Delete product',
            text: 'Are you sure you want to delete this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        set((state) => ({
                            products: state.products.filter((product) => product.id !== productId),
                        }));
                        Swal.fire({
                            title: 'Product deleted!',
                            text: `Product has been deleted.`,
                            icon: 'success',
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete product.',
                            icon: 'error',
                        });
                    });
            }
        });
    },
}));

