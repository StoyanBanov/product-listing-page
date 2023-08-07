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

        let rowSize
        if (width > 2600) {
            rowSize = 7
        } else if (width > 1920) {
            rowSize = 6
        } else if (width > 1350) {
            rowSize = 5
        } else if (width > 1000) {
            rowSize = 4
        } else if (width > 750) {
            rowSize = 3
        } else {
            rowSize = 2
        }
        rootPseudoElement.style.setProperty('--rowSize', rowSize)

        let mainWidth
        if (width > 1200) {
            mainWidth = window.innerWidth * 0.8
            rootPseudoElement.style.setProperty('--mainWidth', `${mainWidth}px`)
            rootPseudoElement.style.setProperty('--prodGridWidth', `${mainWidth - mainWidth / rowSize}px`)
        }
        else if (width > 750) {
            mainWidth = window.innerWidth * 0.9
            rootPseudoElement.style.setProperty('--mainWidth', `${mainWidth}px`)
        } else if (width > 580) {
            mainWidth = window.innerWidth * 0.8
            rootPseudoElement.style.setProperty('--mainWidth', `${mainWidth}px`)
        } else {
            mainWidth = window.innerWidth * 0.9
            rootPseudoElement.style.setProperty('--mainWidth', `${mainWidth}px`)
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