import { create } from 'zustand';

interface ModalState {
    modals: {
        user: boolean;
        product: boolean;
        category: boolean;
        supplier: boolean;
    };
    toggleModal: (modalType: 'user' | 'product' | "category" | "supplier"
    ) => void;
    closeModal: (modalType: 'user' | 'product' | "category" | "supplier"
    ) => void;
    openModal: (modalType: 'user' | 'product' | "category" | "supplier"
    ) => void;
}

const useModal = create<ModalState>((set) => ({
    modals: {
        user: false,
        product: false,
        category: false,
        supplier: false,
    },

    toggleModal: (modalType) => set((state) => ({
        modals: {
            ...state.modals,
            [modalType]: !state.modals[modalType],
        },
    })),

    closeModal: (modalType) => set((state) => ({
        modals: {
            ...state.modals,
            [modalType]: false,
        },
    })),

    openModal: (modalType) => set((state) => ({
        modals: {
            ...state.modals,
            [modalType]: true,
        },
    })),
}));

export default useModal;
