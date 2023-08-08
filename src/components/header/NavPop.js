import { NavLink } from 'react-router-dom'
import { useCategories } from '../common/hooks/useCategories'

import style from './style.module.css'
import { HiddenSub } from '../common/helpers/hiddenSub/HiddenSub'

export const NavPop = ({ displayCategoriesClickHandler }) => {
    const { categories } = useCategories()

    return (
        <nav className={style.mobileNav}>
            <HiddenSub title={'Categories'}>
                <ul>
                    {categories?.map(c => <li onClick={() => displayCategoriesClickHandler(false)} key={c._id}><NavLink to={`/categories/${c._id}/${c.name}`}>{c.name}</NavLink></li>)}
                </ul>
            </HiddenSub>

        </nav>
    )
}