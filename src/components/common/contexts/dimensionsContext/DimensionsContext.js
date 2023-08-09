import { createContext, useEffect, useState } from "react";

export const DimensionsContext = createContext()

const rootPseudoElement = document.querySelector(':root')

export const DimensionsContextProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({})

    useEffect(() => {
        updateDimensions()

        window.addEventListener('resize', updateDimensions)

        window.addEventListener('scroll', updateScroll)

        return () => {
            window.removeEventListener('resize', updateDimensions)
            window.removeEventListener('scroll', updateScroll)
        }
    }, [])

    const updateScroll = () => {
        setDimensions(state => ({
            ...state,
            scroll: window.scrollY
        }))
    }

    const updateDimensions = () => {
        const width = window.innerWidth

        setDimensions(state => ({
            ...state,
            windowWidth: width
        }))

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
            rootPseudoElement.style.setProperty('--prodGridWidth', `${mainWidth - mainWidth / rowSize}px`)
        }
        else if (width > 750) {
            mainWidth = window.innerWidth * 0.9
        } else if (width > 580) {
            mainWidth = window.innerWidth * 0.8
        } else {
            mainWidth = window.innerWidth * 0.9
        }

        rootPseudoElement.style.setProperty('--mainWidth', `${mainWidth}px`)

        if (width > 450)
            rootPseudoElement.style.setProperty('--fontSize', `${mainWidth / rowSize / 16.1}px`)
        else
            rootPseudoElement.style.setProperty('--fontSize', `${mainWidth / rowSize / 14}px`)
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