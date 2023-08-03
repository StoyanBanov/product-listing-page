import { useEffect, useState } from "react"
import { ProductsList } from "./ProductsList"
import { useQueryParams } from "../common/hooks/useQueryParams"

export const ProductPage = () => {

    const [filterValues, setFilterValues] = useState({
        show: 5
    })

    const { queryParamsObj } = useQueryParams()

    useEffect(() => {
        setFilterValues(state => ({ ...state, ...queryParamsObj }));
    }, [queryParamsObj])

    return (
        <>
            <section>
                2
            </section>

            <section>
                Cat Description
            </section>

            <section>
                Sort
            </section>

            <div className="productsContainer">
                <aside>
                    Filter
                </aside>

                <ProductsList />
            </div>
        </>
    )
}