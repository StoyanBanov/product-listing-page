import { ProductsList } from "./ProductsList"
import { ProductFilters } from "./ProductFilters"
import { useParams } from "react-router-dom"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { getCategoryById } from "../../data/services/categoryService"
import { ProductsSort } from "./ProductsSort"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"
import { usePop } from "../common/hooks/usePop"
import { PopBefore } from "../common/helpers/popBefore/PopBefore"

import style from './style.module.css'

export const ProductPage = () => {
    const filtersRef = useRef()

    const [catDesc, setCatDesc] = useState('')

    const [itemsShown, setItemsShown] = useState({ shown: 0, total: 0 })

    const { catId, catName } = useParams()

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        getCategoryById(catId)
            .then(cat => setCatDesc(cat.description))
    }, [catId])

    const setItemsShownHandler = useCallback(({ shown, total }) => {
        setItemsShown({ shown, total })
    }, [])

    const { displayPop: displayFilters, displayPopHandler } = usePop()

    const displayFiltersClickHandler = useCallback((isOpening) => {
        displayPopHandler(isOpening, filtersRef)
    }, [displayPopHandler, filtersRef])

    return (
        <>
            <div className={style.topSections}>
                <section>
                    <article className={style.categoryDescription}>
                        <h2>{catName}</h2>
                        <p>{catDesc}</p>
                    </article>
                </section>

                <section>
                    <p>
                        {`${itemsShown.shown}/${itemsShown.total} products`}
                    </p>
                </section>

                {
                    windowWidth >= 1000 &&
                    <section>
                        <ProductsSort />
                    </section>
                }
            </div>

            {
                windowWidth < 1000 &&
                <div className={style.productsContainer}>
                    <button onClick={displayFiltersClickHandler}>Filters</button>
                    {displayFilters &&
                        <PopBefore popRef={filtersRef} displayPopClickHandler={displayFiltersClickHandler}>
                            <ProductFilters />
                        </PopBefore>
                    }

                    <section>
                        <ProductsSort />
                    </section>
                </div>
            }

            <div className={style.productsContainer}>
                {
                    windowWidth >= 1000 &&
                    <ProductFilters />
                }

                <ProductsList setItemsShownHandler={setItemsShownHandler} />
            </div>

        </>
    )
}