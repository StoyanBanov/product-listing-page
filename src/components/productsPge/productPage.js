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
import { ProductsShow } from "./ProductsShow"

export const ProductPage = () => {
    const filtersRef = useRef()

    const { catId, catName } = useParams()

    const [catDesc, setCatDesc] = useState('')

    const [itemsShown, setItemsShown] = useState({ shown: 0, total: 0 })

    const { windowWidth } = useContext(DimensionsContext)

    const [isLoading, setIsLoading] = useState(false)

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

    const changeIsLoading = useCallback((value) => {
        setIsLoading(value)
    }, [])

    return (
        <>
            {isLoading &&
                <div className={style.loadingOverlay}></div>
            }

            <div className={style.topSections}>
                <section>
                    <article className={style.categoryDescription}>
                        <h2>{catName}</h2>
                        <p>{catDesc}</p>
                    </article>
                </section>

                <section className={style.productsTotalSection}>
                    <p>
                        {`${itemsShown.shown}/${itemsShown.total}${windowWidth >= 1000 ? ' products' : ''}`}
                    </p>
                </section>

                {
                    windowWidth >= 1000 &&
                    <section>
                        <div className={style.sortShowContainer}>
                            <ProductsSort />
                            <ProductsShow />
                        </div>
                    </section>
                }
            </div>

            {
                windowWidth < 1000 &&
                <div className={style.mobileSortFilterContainer}>
                    <button className={style.mobileFiltersBtn} onClick={displayFiltersClickHandler}>Filter/Search</button>
                    {displayFilters &&
                        <PopBefore popRef={filtersRef} displayPopClickHandler={displayFiltersClickHandler} closeBtnText={`SHOW RESULTS (${itemsShown.total})`}>
                            <ProductFilters productsCount={itemsShown.total} />
                        </PopBefore>
                    }

                    <section className={style.sortShowContainer}>
                        <ProductsSort />
                        <ProductsShow />
                    </section>
                </div>
            }

            <div className={style.productsContainer}>
                {
                    windowWidth >= 1000 &&
                    <ProductFilters productsCount={itemsShown.total} />
                }

                <ProductsList setItemsShownHandler={setItemsShownHandler} changeIsLoading={changeIsLoading} />
            </div>

        </>
    )
}