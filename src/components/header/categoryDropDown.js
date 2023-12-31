import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCategories } from '../common/hooks/useCategories'

import style from './style.module.css'

export const CategoryDropDown = () => {
    const { categories } = useCategories()

    const [showDropDown, setShowDropDown] = useState(false)

    const categoryDropDownHandler = useCallback(e => {
        setShowDropDown(e.type === 'mouseover')
    }, [])

    return (
        <div
            onMouseOver={categoryDropDownHandler}
            onMouseOut={categoryDropDownHandler}
            className={style.categoryDropDownContainer}
        >
            <span >Categories</span>

            {showDropDown &&
                <ul className={style.categoryDropDown}>
                    {categories?.map(c => <li key={c._id}><NavLink to={`/categories/${c._id}/${c.name}`}>{c.name}</NavLink></li>)}
                </ul>
            }
        </div>
    )
}