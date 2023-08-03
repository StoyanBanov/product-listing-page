import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../../data/services/productService"
import { ProductTile } from "./ProductTile"
import { useParams } from "react-router-dom"

import style from './style.module.css'

export const ProductsList = () => {
    const [products, setProducts] = useState({ list: [], totalCount: 0 })

    const [skip, setSkip] = useState(0)

    const { catId } = useParams()

    console.log(products.totalCount, skip, catId);

    useEffect(() => {
        getProducts({ catId, limit: 5 })
            .then(res => {
                setProducts(res)
                if (res.length)
                    setSkip(res.length)
            })
    }, [catId])

    const loadMoreProductsHandler = useCallback(() => {
        getProducts({ catId, skip, limit: 5 }).then(res => {
            setProducts(state => ({ totalCount: res.totalCount, list: [...state.list, ...res.list] }))
            setSkip(state => state + res.length)
        })
    }, [catId, skip])

    return (
        <section>
            <div className={style.productGrid}>
                {
                    products.list.map(p => <ProductTile key={p._id} product={p} />)
                }
            </div>

            {products.totalCount > skip
                ? <button onClick={loadMoreProductsHandler}>Load More</button>
                : <p>No more products</p>
            }
        </section>
    )
}