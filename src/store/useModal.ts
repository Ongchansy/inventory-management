import {create} from 'zustand'

interface ModalState {
    isModalOpen: boolean
    toggleModal: () => void
    closeModal: () => void
    openModal: () => void
}

const useModal = create<ModalState>((set) => ({
    isModalOpen: false,
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
    closeModal: () => set({ isModalOpen: false }),
    openModal: () => set({ isModalOpen: true }),
}))

export default useModal;