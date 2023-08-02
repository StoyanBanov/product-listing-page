import { useCallback, useState } from "react"
import { CategoryDropDown } from "./categoryDropDown"

import style from './style.module.css'

export const Header = () => {

    const [showDropDown, setShowDropDown] = useState(false)

    const categoryDropDownHandler = useCallback(e => {
        setShowDropDown(e.type === 'mouseover')
    }, [])

    return (
        <header>
            <div><h1>LOGO</h1></div>

            <div
                onMouseOver={categoryDropDownHandler}
                onMouseOut={categoryDropDownHandler}
                className={style.categoryDropDownContainer}
            >
                <span>Categories</span>

                {showDropDown &&
                    <CategoryDropDown />
                }

            </div>
        </header>
    )
}