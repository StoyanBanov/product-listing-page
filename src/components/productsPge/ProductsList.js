import { useCallback, useContext, useEffect, useState } from "react"
import { getProducts } from "../../data/services/productService"
import { ProductTile } from "./ProductTile"
import { useParams } from "react-router-dom"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import { SHOW_PRODUCTS_DEFAULT } from "./constants"

import style from './style.module.css'


export const ProductsList = ({ setItemsShownHandler }) => {
    const [products, setProducts] = useState({ list: [], totalCount: 0, currentCount: 0 })

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        setItemsShownHandler({ shown: products.list.length, total: products.totalCount })
    }, [setItemsShownHandler, products])

    useEffect(() => {
        if (queryParamsObj && windowWidth) {
            let show = queryParamsObj.show ?? SHOW_PRODUCTS_DEFAULT
            if (windowWidth < 600 && show > 5) {
                show = 5
            } else if (windowWidth < 1000 && show > 10) {
                show = 10
            } else if (windowWidth < 1400 && show > 20) {
                show = 10
            }
            getProducts({ catId, ...queryParamsObj, show })
                .then(data => {
                    setProducts(state => {
                        const currentCount = (queryParamsObj.skip ?? state.list.length) + data.list.length
                        return !state.list.length || !queryParamsObj.skip
                            ? { ...data, currentCount }
                            : ({ list: [...state.list, ...data.list], totalCount: data.totalCount, currentCount })
                    })
                })
        }
    }, [catId, queryParamsObj, windowWidth])

    const loadMoreProductsHandler = useCallback(() => {
        const skip = products.currentCount

        setQueryParams({ ...queryParamsObj, skip })
    }, [queryParamsObj, setQueryParams, products])

    return (
        <section>
            <div id="productsList" className={style.productGrid}>
                {
                    products.list.map(p => <ProductTile key={p._id} product={p} />)
                }
            </div>

            {products.totalCount > products.currentCount
                ? <button onClick={loadMoreProductsHandler}>Load More</button>
                : <p>No more products</p>
            }
        </section>
    )
}