import { useCallback, useContext, useEffect, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { MAX_PRICE_DEFAULT, MAX_SHOW_PER_WIDTH, SHOW_PRODUCTS_DEFAULT } from "./constants"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import style from './style.module.css'
import { getProductRanges } from "../../data/services/productService"
import { useParams } from "react-router-dom"
import { setCorrectShowValue } from "./util"
import { ProductFilterSlider } from "./ProductFilterSlider"
import { HiddenSub } from "../common/helpers/hiddenSub/HiddenSub"

export const ProductFilters = ({ productsCount }) => {
    const [filters, setFilters] = useState({
        show: SHOW_PRODUCTS_DEFAULT,
        minPrice: 0,
        maxPrice: MAX_PRICE_DEFAULT,
        search: ''
    })

    const [dataRanges, setDataRanges] = useState({})

    const [initialPrices, setInitialPrices] = useState({
        min: 0,
        max: MAX_PRICE_DEFAULT
    })

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        if (windowWidth && queryParamsObj) {
            let show = setCorrectShowValue(queryParamsObj.show, windowWidth)
            getProductRanges({ catId, ...queryParamsObj })
                .then(data => {
                    const filterRanges = {}

                    const dataRanges = Object.entries(data).reduce((obj, [k, v]) => {
                        if (Array.isArray(data[k])) {
                            obj[k] = v
                            filterRanges[k] = queryParamsObj[k]?.split(',') || []
                        }

                        return obj
                    }, {})

                    setDataRanges(dataRanges)

                    const defFilters = {
                        show: SHOW_PRODUCTS_DEFAULT,
                        minPrice: 0,
                        maxPrice: MAX_PRICE_DEFAULT,
                        search: ''
                    }

                    setFilters({ ...defFilters, ...queryParamsObj, ...filterRanges, show })

                    setInitialPrices({ min: data.minPrice, max: data.maxPrice })
                })
        }
    }, [catId, queryParamsObj, windowWidth])

    const changeFilterHandler = (e) => {
        const key = e.currentTarget.name ?? e.currentTarget.getAttribute('name')
        const value = e.currentTarget.name ? e.currentTarget.value : e.currentTarget.getAttribute('value')

        setFilters(state => ({ ...state, [key]: Array.isArray(state[key]) ? [...state[key], value] : value }))

        const filtersProper = Object.entries(filters).reduce((obj, [k, v]) => {
            if (Array.isArray(filters[k])) {
                if (key === k && !filters[k].includes(value)) {
                    v.push(value)
                }
                obj[k] = `${v.join(',')}`
            }
            else {
                obj[k] = key === k ? value : v
            }
            return obj
        }, {})

        if (key === 'search') {
            setQueryParams({ search: value, skip: 0 })
        } else
            setQueryParams({ ...filtersProper, skip: 0 })
    }

    const changePrices = (minPrice, maxPrice) => {
        setFilters(state => ({ ...state, minPrice, maxPrice }))

        const rangesProper = Object.entries(filters).reduce((obj, [k, v]) => {
            if (Array.isArray(filters[k])) {
                obj[k] = `${v.join(',')}`
            }
            return obj
        }, {})

        setQueryParams({ ...filters, ...rangesProper, minPrice, maxPrice, skip: 0 })
    }

    const submitFiltersHandler = useCallback(e => {
        e.preventDefault()

        setQueryParams({ ...queryParamsObj, search: filters.search, skip: 0 })
    }, [setQueryParams, filters, queryParamsObj])

    return (
        <aside className={style.filtersContainer}>
            <h3>FILTERS</h3>

            <form className={style.filterForm} onSubmit={submitFiltersHandler}>
                <div>
                    <label htmlFor="showFilter">Show</label>
                    <select id="showFilter" name="show" value={filters.show} onChange={changeFilterHandler}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        {
                            Object.values(MAX_SHOW_PER_WIDTH).map((s, i) => <option key={i} value={s}>{s}</option>)
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="searchFilter">Search</label>
                    <input id="searchFilter" name="search" value={filters.search} onChange={changeFilterHandler} />
                </div>

                <div className={style.filterPriceContainer}>
                    <label>Price</label>
                    <ProductFilterSlider changePrices={changePrices} initialValues={initialPrices} />
                </div>

                {
                    Object.entries(dataRanges).map(([k, v]) =>
                        <HiddenSub key={k} title={k}>
                            {
                                <ul>
                                    {
                                        v.map(a => <li name={k} value={a} onClick={changeFilterHandler} key={a}>{a}</li>)
                                    }
                                </ul>
                            }
                        </HiddenSub>
                    )
                }

                <button>SHOW RESULTS ({productsCount})</button>
            </form>
        </aside>
    )
}