import {create} from 'zustand'

interface Theme {
    theme: string;
    toggle: boolean;
    toggleTheme: () => void;
    setToggle: () => void;
}

const useUiStore = create<Theme>((set) => ({
    theme: 'light',
    toggle: true,
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setToggle: () => set((state) => ({
        toggle: !state.toggle
    }))
}))

export default useUiStore;