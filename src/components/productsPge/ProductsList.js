import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../../data/services/productService"
import { ProductTile } from "./ProductTile"
import { useParams } from "react-router-dom"

import { useQueryParams } from "../common/hooks/useQueryParams"

import style from './style.module.css'

export const ProductsList = () => {
    const [products, setProducts] = useState({ list: [], totalCount: 0, currentCount: 0 })

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    useEffect(() => {
        if (queryParamsObj) {
            getProducts({ catId, ...queryParamsObj })
                .then(data => {
                    setProducts(state => {
                        const currentCount = (queryParamsObj.skip ?? state.list.length) + data.list.length
                        return !state.list.length || !queryParamsObj.skip
                            ? { ...data, currentCount }
                            : ({ list: [...state.list, ...data.list], totalCount: data.totalCount, currentCount })
                    }
                    )
                })
        }
    }, [catId, queryParamsObj])

    const loadMoreProductsHandler = useCallback(() => {
        const skip = products.currentCount

        setQueryParams({ ...queryParamsObj, skip })
    }, [queryParamsObj, setQueryParams, products])

    return (
        <section>
            <div className={style.productGrid}>
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