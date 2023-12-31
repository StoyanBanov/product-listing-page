import { useCallback, useContext, useRef } from "react"
import { CategoryDropDown } from "./categoryDropDown"

import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../common/contexts/CartContext"
import { Cart } from "../cart/Cart"

import style from './style.module.css'
import { NavPop } from "./NavPop"
import { usePop } from "../common/hooks/usePop"
import { PopBefore } from "../common/helpers/popBefore/PopBefore"
import { CartSVG } from "../common/helpers/CartSVG"

export const Header = () => {

    const { windowWidth, scroll } = useContext(DimensionsContext)

    const { cartDropDownRef } = useContext(CartContext)

    const categoriesRef = useRef()

    const navigate = useNavigate()

    const cartClickHandler = useCallback(() => {
        navigate('/cart')
    }, [navigate])

    const cartHoverHandler = useCallback(e => {
        cartDropDownRef.current.style.display = e.type === 'mouseover' ? 'block' : 'none'
    }, [cartDropDownRef])

    const { displayPop: displayCategories, displayPopHandler } = usePop()

    const displayCategoriesClickHandler = useCallback((isOpening) => {
        displayPopHandler(isOpening, categoriesRef)
    }, [displayPopHandler, categoriesRef])

    return (
        <>
            {displayCategories &&
                <PopBefore popRef={categoriesRef} displayPopClickHandler={displayCategoriesClickHandler}>
                    <NavPop displayCategoriesClickHandler={displayCategoriesClickHandler} />
                </PopBefore>
            }

            <header>

                {windowWidth >= 1000 &&
                    <div style={{ paddingBottom: '9px', marginLeft: '1vw' }}>
                        <img height={44} src={'/images/logoType.png'} alt="logo" />
                    </div>
                }

                <nav>
                    {windowWidth < 1000 &&
                        <>
                            <svg onClick={() => displayCategoriesClickHandler(true)} width={30} height={30} stroke="black" strokeWidth={2}>
                                <line x1={3} y1={8} x2={25} y2={8} />
                                <line x1={3} y1={17} x2={18} y2={17} />
                                <line x1={3} y1={27} x2={25} y2={27} />
                            </svg>
                            <img height={44} src={`/images/logo${windowWidth > 550 ? 'Type' : ''}.png`} alt="logo" />
                        </>
                    }

                    {scroll > 55 && windowWidth >= 1000 &&
                        <img height={44} style={{ marginRight: '20px' }} src={`/images/logo.png`} alt="logo" />
                    }

                    {windowWidth >= 1000 &&
                        <CategoryDropDown />
                    }

                    <div className={style.cartDiv}>
                        <button
                            onMouseOver={cartHoverHandler}
                            onMouseOut={cartHoverHandler}
                        >
                            <CartSVG />
                        </button>
                        <div
                            ref={cartDropDownRef}
                            onMouseOver={cartHoverHandler}
                            onMouseOut={cartHoverHandler}
                            style={{ display: 'none' }}
                        >
                            <Cart />
                        </div>
                    </div>

                </nav>

            </header >
        </>
    )
}