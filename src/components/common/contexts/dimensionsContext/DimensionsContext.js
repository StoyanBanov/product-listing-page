import { createContext, useEffect, useState } from "react";

export const DimensionsContext = createContext()

const rootPseudoElement = document.querySelector(':root')

export const DimensionsContextProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({})

    useEffect(() => {
        updateDimensions()

        window.addEventListener('resize', updateDimensions)

        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setDimensions({
            windowWidth: width
        })
        if (width < 1000) {
            rootPseudoElement.style.setProperty('--width', `${300 - Math.trunc((1000 - width) / 4.2)}px`)
            rootPseudoElement.style.setProperty('--height', `${450 - Math.trunc((1000 - width) / 4)}px`)

            rootPseudoElement.style.setProperty('--fontSize', `${16 - Math.trunc((1000 - width) / 160)}px`)
        }
    }

    return (
        <DimensionsContext.Provider
            value={
                dimensions
            }
        >
            {children}
        </DimensionsContext.Provider>
    )
}