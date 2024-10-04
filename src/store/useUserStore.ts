import { create } from 'zustand';
import Swal from 'sweetalert2';
import { User } from '@/types/types';

interface UserStore {
    users: User[];
    selectedUser: User | null;
    mode: 'view' | 'edit' | null; // Add mode property
    isViewSheetOpen: boolean;
    toggleViewSheet: () => void; // Function to toggle the view sheet
    fetchUsers: () => Promise<void>;
    selectUser: (user: User, mode: 'view' | 'edit' | null) => void; // Update selectUser signature
    closeViewSheet: () => void;
    createUser: (newUser: User) => Promise<void>;
    updateUser: (updatedUser: User, id: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
}

export const UseUserStore = create<UserStore>((set) => ({
    users: [],
    selectedUser: null,
    mode: null, // Initialize mode
    isViewSheetOpen: false,

    toggleViewSheet: () => set((state) => ({ isViewSheetOpen: !state.isViewSheetOpen })), // Toggle the view sheet

    fetchUsers: async () => {
        const response = await fetch('/api/users');
        const data: User[] = await response.json();
        set({ users: data });
    },

    selectUser: (user: User, mode: 'view' | 'edit' | null) => set({ selectedUser: user, mode, isViewSheetOpen: true }), // Set mode and open sheet

    closeViewSheet: () => set({ isViewSheetOpen: false, selectedUser: null, mode: null }), // Reset selectedUser and mode on close

    createUser: async (newUser: User) => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const createdUser:User = await response.json();
            set((state) => ({
                users: [...state.users, createdUser],
            }));
            Swal.fire({
                title: 'User created!',
                text: `User ${createdUser?.username} has been created.`,
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Failed to create user.',
                icon: 'error',
            });
        }
    },

    updateUser: async (updatedUser: User, id: string) => {
        Swal.fire({
            title: 'Update user',
            text: 'Are you sure you want to update this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        set((state) => ({
                            users: state.users.map((user) => (user.id === id ? data : user)),
                        }));
                        Swal.fire({
                            title: 'User updated!',
                            text: `User ${data.name} has been updated.`,
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to update user.',
                            icon: 'error',
                        });
                    });
            }
        })
    },

    deleteUser: async (userId: string) => {
        Swal.fire({
            title: 'Delete user',
            text: 'Are you sure you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        set((state) => ({
                            users: state.users.filter((user) => user.id !== userId),
                        }));
                        Swal.fire({
                            title: 'User deleted!',
                            text: `User has been deleted.`,
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete user.',
                            icon: 'error',
                        });
                    });
            }
        })
    },
}));

