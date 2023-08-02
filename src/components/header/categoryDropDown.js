import { useEffect, useState } from 'react'

import { getCategories } from '../../data/services/categoryService'

import style from './style.module.css'

export const CategoryDropDown = () => {
    const [categories, setCategories] = useState()

    useEffect(() => {
        setCategories(getCategories())
    }, [])

    return (
        <ul className={style.categoryDropDown}>
            {categories?.map(c => <li key={c._id}>{c.name}</li>)}
        </ul>
    )
}