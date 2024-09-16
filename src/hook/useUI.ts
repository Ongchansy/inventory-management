import useUiStore from "@/store/uiStore"

const useUi = () => {
    const {theme, toggleTheme, toggle, setToggle} = useUiStore()

    return {
        theme,
        toggleTheme,
        toggle,
        setToggle
    }

    
}

export default useUi;