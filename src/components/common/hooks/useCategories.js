import { useEffect, useState } from "react"
import { getCategories } from "../../../data/services/categoryService"

export const useCategories = () => {
    const [categories, setCategories] = useState()

    useEffect(() => {
        getCategories()
            .then(setCategories)
    }, [])

    return {
        categories
    }
}