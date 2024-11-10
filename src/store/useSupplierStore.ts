import { create } from 'zustand';
import Swal from 'sweetalert2';
import { Supplier } from '@/types/types';

interface SupplierStore {
    suppliers: Supplier[];
    selectedSupplier: Supplier | null;
    mode: 'view' | 'edit' | null; // Add mode property
    isViewSheetOpen: boolean;
    toggleViewSheet: () => void; // Function to toggle the view sheet
    fetchSuppliers: () => Promise<void>;
    selectSupplier: (supplier: Supplier, mode: 'view' | 'edit') => void; // Update selectSupplier signature
    closeViewSheet: () => void;
    createSupplier: (formData: Supplier ) => Promise<void>;
    updateSupplier: (updatedSupplier: Supplier, id: string) => Promise<void>;
    deleteSupplier: (supplierId: string) => Promise<void>;
}

export const UseSupplierStore = create<SupplierStore>((set) => ({
    suppliers: [],
    selectedSupplier: null,
    mode: null, // Initialize mode
    isViewSheetOpen: false,

    toggleViewSheet: () => set((state) => ({ isViewSheetOpen: !state.isViewSheetOpen })), // Toggle the view sheet

    fetchSuppliers: async () => {
        const response = await fetch('/api/suppliers');
        const data: Supplier[] = await response.json();
        set({ suppliers: data });
    },

    selectSupplier: (supplier: Supplier, mode: 'view' | 'edit') => set({ selectedSupplier: supplier, mode, isViewSheetOpen: true }), // Set mode and open sheet

    closeViewSheet: () => set({ isViewSheetOpen: false, selectedSupplier: null, mode: null }), // Reset selectedSupplier and mode on close

    createSupplier: async (formData: Supplier) => {
        try {
            const response = await fetch('/api/suppliers', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const createdSupplier: Supplier = await response.json();
                set((state) => ({
                    suppliers: [...state.suppliers, createdSupplier],
                }));
                Swal.fire({
                    title: 'Supplier created!',
                    text: `Supplier ${createdSupplier?.name} has been created.`,
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to create supplier.',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error("Failed to create supplier:", error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to create supplier.',
                icon: 'error',
            });
        }
    },
    

    updateSupplier: async (updatedSupplier: Supplier, id: string) => {
        Swal.fire({
            title: 'Update supplier',
            text: 'Are you sure you want to update this supplier?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/suppliers/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedSupplier),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        set((state) => ({
                            suppliers: state.suppliers.map((supplier) => (supplier.id === id ? data : supplier)),
                        }));
                        Swal.fire({
                            title: 'Supplier updated!',
                            text: `Supplier ${data.name} has been updated.`,
                            icon: 'success',
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to update supplier.',
                            icon: 'error',
                        });
                    });
            }
        })
    },

    deleteSupplier: async (supplierId: string) => {
        Swal.fire({
            title: 'Delete supplier',
            text: 'Are you sure you want to delete this supplier?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/suppliers/${supplierId}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        set((state) => ({
                            suppliers: state.suppliers.filter((supplier) => supplier.id !== supplierId),
                        }));
                        Swal.fire({
                            title: 'Supplier deleted!',
                            text: `Supplier has been deleted.`,
                            icon: 'success',
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete supplier.',
                            icon: 'error',
                        });
                    });
            }
        })
    },
}));
