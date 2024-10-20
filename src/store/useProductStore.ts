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
    createProduct: (newProduct: Product) => Promise<void>;
    updateProduct: (updateProduct: Product, id: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
}

export const useProductStore = create<UserStore>((set) => ({
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
    createProduct: async (newProduct: Product) => {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
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
    updateProduct: async (updateProduct: Product, id: string) => {
    Swal.fire({
        title: 'Update product',
        text: 'Are you sure you want to update this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            // Convert price and quantity to numbers
            const updatedData = {
                ...updateProduct,
                price: parseFloat(updateProduct.price.toString()),  // Ensure price is a float
                quantity: parseInt(updateProduct.quantity.toString()),  // Ensure quantity is an integer
                // If image is an object, make sure to handle it appropriately
            };

            fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update product');
                    }
                    return response.json();
                })
                .then((data) => {
                    set((state) => ({
                        products: state.products.map((product) => (product.id === id ? data : product)),
                    }));
                    Swal.fire({
                        title: 'Product updated!',
                        text: `Product ${data.name} has been updated.`,
                        icon: 'success',
                    });
                })
                .catch((error) => {
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
                    .catch((error) => {
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

