import { ProductsList } from "./ProductsList"
import { ProductFilters } from "./ProductFilters"
import { useParams } from "react-router-dom"
import { useCallback, useContext, useEffect, useState } from "react"
import { getCategoryById } from "../../data/services/categoryService"
import { ProductsSort } from "./ProductsSort"

import style from './style.module.css'
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

export const ProductPage = () => {
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

    return (

        <>
            {windowWidth > 1000
                ? <>
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

                        <section>
                            <ProductsSort />
                        </section>
                    </div>

                    <div className="productsContainer">
                        <ProductFilters />

                        <ProductsList setItemsShownHandler={setItemsShownHandler} />
                    </div>
                </>
                : <>
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


                    </div>

                    <div className="productsContainer">
                        <ProductFilters />

                        <section>
                            <ProductsSort />
                        </section>
                    </div>
                    <ProductsList setItemsShownHandler={setItemsShownHandler} />
                </>
            }

        </>
    )
}