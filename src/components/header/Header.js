import { useCallback, useContext, useState } from "react"
import { CategoryDropDown } from "./categoryDropDown"

import style from './style.module.css'
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

export const Header = () => {

    const [showDropDown, setShowDropDown] = useState(false)

    const [displayNav, setDisplayNav] = useState(false)

    const { windowWidth } = useContext(DimensionsContext)

    const categoryDropDownHandler = useCallback(e => {
        setShowDropDown(e.type === 'mouseover')
    }, [])

    const displayNavHandler = useCallback(e => {
        setDisplayNav(e.type === 'mouseover')
    }, [])

    return (
        <header>
            <div><h1>LOGO</h1></div>

            <nav>
                {windowWidth < 1000
                    ? <div style={{ display: 'inline' }} onMouseOver={displayNavHandler} onMouseOut={displayNavHandler}>
                        <svg width={20} height={20}>
                            <line x1={3} y1={3} x2={17} y2={3} stroke="black" strokeWidth={2} />
                            <line x1={3} y1={10} x2={17} y2={10} stroke="black" strokeWidth={2} />
                            <line x1={3} y1={17} x2={17} y2={17} stroke="black" strokeWidth={2} />
                        </svg>
                        {displayNav &&
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
                        }
                    </div>

                    : <div
                        onMouseOver={categoryDropDownHandler}
                        onMouseOut={categoryDropDownHandler}
                        className={style.categoryDropDownContainer}
                    >
                        <span>Categories</span>

                        {showDropDown &&
                            <CategoryDropDown />
                        }
                    </div>
                }

            </nav>

        </header>
    )
}