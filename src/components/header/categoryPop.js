import { NavLink } from 'react-router-dom'
import { useCategories } from '../common/hooks/useCategories'

import style from './style.module.css'

export const CategoryPop = () => {
    const { categories } = useCategories()

    return (
        <ul>
            {categories?.map(c => <li key={c._id}><NavLink to={`/categories/${c._id}/${c.name}`}>{c.name}</NavLink></li>)}
        </ul>
    )
}