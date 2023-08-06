import { NavLink } from 'react-router-dom'
import { useCategories } from '../common/hooks/useCategories'

import style from './style.module.css'
import { useCallback, useState } from 'react'

export const NavPop = () => {
    const { categories } = useCategories()

    const [itemsVisibility, setItemsVisibility] = useState({
        categories: false
    })

    const showNavItemHandler = useCallback(e => {
        const key = e.currentTarget.id
        setItemsVisibility(state => ({ ...state, [key]: !state[key] }))
    }, [])

    return (
        <nav className={style.mobileNav}>
            <div className={style.popNavItem}>
                <div id="categories" onClick={showNavItemHandler} className={style.popNavItemTop}>
                    <div>
                        <span>Categories</span>
                    </div>

                    <svg width={18} height={18} fill="none" stroke="black" strokeWidth={2}>
                        {itemsVisibility.categories
                            ? <path d={'M2 2 L9 14 L16 2'} />
                            : <path d={'M12 2 L2 9 L12 16'} />
                        }
                    </svg>
                </div>

                {itemsVisibility.categories &&
                    <ul>
                        {categories?.map(c => <li key={c._id}><NavLink to={`/categories/${c._id}/${c.name}`}>{c.name}</NavLink></li>)}
                    </ul>
                }
            </div>

        </nav>
    )
}