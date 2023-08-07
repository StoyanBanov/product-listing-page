import { useCallback, useContext, useEffect, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { MAX_PRICE_DEFAULT, MAX_SHOW_PER_WIDTH, SHOW_PRODUCTS_DEFAULT } from "./constants"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import style from './style.module.css'
import { getProducts } from "../../data/services/productService"
import { useParams } from "react-router-dom"
import { setCorrectShowValue } from "./util"
import { ProductFilterSlider } from "./ProductFilterSlider"

export const ProductFilters = () => {
    const [filters, setFilters] = useState({
        show: SHOW_PRODUCTS_DEFAULT,
        minPrice: 0,
        maxPrice: MAX_PRICE_DEFAULT,
        search: ''
    })

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    const { windowWidth } = useContext(DimensionsContext)

    const [potentialProdsCount, setPotentialProdsCount] = useState(0)

    useEffect(() => {
        if (windowWidth && queryParamsObj) {
            let show = setCorrectShowValue(queryParamsObj.show, windowWidth)

            setFilters(state => ({ ...state, ...queryParamsObj, show }));
        }
    }, [catId, queryParamsObj, windowWidth])

    useEffect(() => {
        getProducts({ catId, ...filters })
            .then(data => setPotentialProdsCount(data.totalCount))
    }, [filters, catId])

    const changeFilterHandler = (e, key, value) => {
        setFilters(state => ({ ...state, [e?.target.name ?? key]: e?.target.value ?? value }))
    }

    const submitFiltersHandler = useCallback(e => {
        e.preventDefault()

        setQueryParams({ ...queryParamsObj, ...filters, skip: 0 })
    }, [setQueryParams, filters, queryParamsObj])

    return (
        <aside className={style.filtersContainer}>
            <h3>FILTERS</h3>
            <form className={style.filterForm} onSubmit={submitFiltersHandler}>
                <div>
                    <label htmlFor="showFilter">Show </label>
                    <select id="showFilter" name="show" value={filters.show} onChange={changeFilterHandler}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        {
                            Object.values(MAX_SHOW_PER_WIDTH).map((s, i) => <option key={i} value={s}>{s}</option>)
                        }
                    </select>
                </div>

                <div className={style.filterPriceContainer}>
                    <label>Price</label>
                    <ProductFilterSlider changeFilterHandler={changeFilterHandler} />

                    <div>
                        <div>
                            <label>min</label>
                            <input type="number" name="minPrice" min={0} max={10000} value={filters.minPrice} onChange={changeFilterHandler} disabled />
                        </div>
                        <div>
                            <label>max</label>
                            <input type="number" name="maxPrice" min={0} max={10000} value={filters.maxPrice} onChange={changeFilterHandler} disabled />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="searchFilter">Search</label>
                    <input id="searchFilter" name="search" value={filters.search} onChange={changeFilterHandler} />
                </div>

                <button>SHOW RESULTS ({potentialProdsCount})</button>
            </form>
        </aside>
    )
}