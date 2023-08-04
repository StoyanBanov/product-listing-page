import { ProductsList } from "./ProductsList"
import { ProductFilters } from "./ProductFilters"
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { getCategoryById } from "../../data/services/categoryService"

export const ProductPage = () => {
    const [catDesc, setCatDesc] = useState('')

    const [itemsShown, setItemsShown] = useState({ shown: 0, total: 0 })

    const { catId } = useParams()

    useEffect(() => {
        getCategoryById(catId)
            .then(cat => setCatDesc(cat.description))
    }, [catId])

    const setItemsShownHandler = useCallback(({ shown, total }) => {
        setItemsShown({ shown, total })
    }, [])

    return (
        <>
            <section>
                <p>
                    {`${itemsShown.shown}/${itemsShown.total}`}
                </p>
            </section>

            <section>
                {catDesc}
            </section>

            <section>
                Sort
            </section>

            <div className="productsContainer">
                <ProductFilters />

                <ProductsList setItemsShownHandler={setItemsShownHandler} />
            </div>
        </>
    )
}