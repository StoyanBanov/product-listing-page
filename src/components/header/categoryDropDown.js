import { useCallback, useEffect, useState } from 'react'

import { getCategories } from '../../data/services/categoryService'

import style from './style.module.css'
import { NavLink } from 'react-router-dom'

export const CategoryDropDown = () => {
    const [categories, setCategories] = useState()

    const [showDropDown, setShowDropDown] = useState(false)

    const categoryDropDownHandler = useCallback(e => {
        setShowDropDown(e.type === 'mouseover')
    }, [])

    useEffect(() => {
        setCategories(getCategories())
    }, [])

    return (
        <div
            onMouseOver={categoryDropDownHandler}
            onMouseOut={categoryDropDownHandler}
            className={style.categoryDropDownContainer}
        >
            <span>Categories</span>

            {showDropDown &&
                <ul className={style.categoryDropDown}>
                    {categories?.map(c => <li key={c._id}><NavLink to={`/${c._id}/${c.name}`}>{c.name}</NavLink></li>)}
                </ul>
            }
        </div>
    )
}