import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../../data/services/productService"
import { ProductTile } from "./ProductTile"
import { useParams } from "react-router-dom"

import { useQueryParams } from "../common/hooks/useQueryParams"

import style from './style.module.css'

export const ProductsList = () => {
    const [products, setProducts] = useState({ list: [], totalCount: 0 })

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    useEffect(() => {
        getProducts({ catId, ...queryParamsObj, skip: 0 })
            .then(res => {
                setProducts(res)
            })
    }, [catId, queryParamsObj])

    const loadMoreProductsHandler = useCallback(() => {
        const skip = products.list.length

        getProducts({ catId, ...queryParamsObj, skip, count: skip + 5 })
            .then(({ list, totalCount }) => {
                setQueryParams({ ...queryParamsObj, skip, count: skip + list.length })

                setProducts(state => ({ list: [...state.list, ...list], totalCount }))
            })
    }, [catId, queryParamsObj, setQueryParams, products])

    return (
        <section>
            <div className={style.productGrid}>
                {
                    products.list.map(p => <ProductTile key={p._id} product={p} />)
                }
            </div>

            {products.totalCount > products.list.length
                ? <button onClick={loadMoreProductsHandler}>Load More</button>
                : <p>No more products</p>
            }
        </section>
    )
}