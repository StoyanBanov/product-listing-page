import { createContext, useEffect, useState } from "react";

export const DimensionsContext = createContext()

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
        setDimensions({ windowWidth: window.innerWidth })
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