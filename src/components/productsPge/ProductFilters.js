import { useCallback, useContext, useEffect, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import style from './style.module.css'
import { getProductRanges } from "../../data/services/productService"
import { useParams } from "react-router-dom"
import { ProductFilterSlider } from "./ProductFilterSlider"
import { HiddenSub } from "../common/helpers/hiddenSub/HiddenSub"
import { getResetQueryParams, parseFilters, parseRangeName } from "./util"

export const ProductFilters = () => {
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        search: ''
    })

    const [dataRanges, setDataRanges] = useState({})

    const [initialPrices, setInitialPrices] = useState()

    const { catId } = useParams()

    const { queryParamsObj, setQueryParams } = useQueryParams()

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        if (windowWidth && queryParamsObj) {
            getProductRanges({ catId, ...queryParamsObj })
                .then(data => {
                    const filterRanges = {}

                    const dataRanges = Object.entries(data).reduce((obj, [k, v]) => {
                        if (Array.isArray(v)) {
                            const queryValues = queryParamsObj[k]?.length ? queryParamsObj[k].split(',') : []
                            obj[k] = [...new Set([...v, ...queryValues])].sort()
                            filterRanges[k] = queryValues
                        }

                        return obj
                    }, {})

                    setDataRanges(dataRanges)

                    const defFilters = {
                        minPrice: '',
                        maxPrice: '',
                        search: ''
                    }

                    setFilters({ ...defFilters, ...queryParamsObj, ...filterRanges })

                    setInitialPrices({ min: data.minPrice, max: data.maxPrice })
                })
        }
    }, [catId, queryParamsObj, windowWidth, setQueryParams])

    const changeFilterHandler = (e) => {
        const key = e.currentTarget.name ?? e.currentTarget.getAttribute('name')
        const value = e.currentTarget.name ? e.currentTarget.value : e.currentTarget.getAttribute('value')

        const newFilter = Array.isArray(filters[key])
            ? filters[key].includes(value)
                ? filters[key].filter(v => v !== value)
                : [...filters[key], value]
            : value

        setFilters(state => ({ ...state, [key]: newFilter }))

        if (key !== 'search') {
            setQueryParams({ ...parseFilters(filters), [key]: Array.isArray(newFilter) ? newFilter.join(',') : newFilter, skip: 0 })
        }
    }

    const changePrices = (minPrice, maxPrice) => {
        setFilters(state => ({ ...state, minPrice, maxPrice }))

        setQueryParams({ ...parseFilters(filters), minPrice, maxPrice, skip: 0 })
    }

    const submitSearchHandler = e => {
        e.preventDefault()

        setQueryParams({ ...getResetQueryParams(queryParamsObj), search: filters.search, skip: 0 })
    }

    const resetFiltersHandler = useCallback(() => {
        setQueryParams(getResetQueryParams(queryParamsObj))
    }, [setQueryParams, queryParamsObj])

    return (
        <aside className={style.filtersContainer}>
            <div className={style.searchContainer}>
                <form>
                    <div>
                        <input placeholder="search" id="searchFilter" name="search" value={filters.search} onChange={changeFilterHandler} />

                        <svg onClick={submitSearchHandler} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>
                    </div>
                </form>
            </div>

            <div className={style.FiltersHeader}>
                <h3>FILTERS</h3>
                <button onClick={resetFiltersHandler}>Reset</button>
            </div>

            <div className={style.filterForm}>
                {
                    Object.entries(dataRanges).map(([k, v]) =>
                        <HiddenSub key={k} title={parseRangeName(k)} initialVisibility={queryParamsObj[k]}>
                            {
                                <ul className={style.hiddenFilterUl}>
                                    {
                                        v.map(a => <li name={k} value={a} onClick={changeFilterHandler} key={a}>
                                            <span>
                                                {a}
                                            </span>

                                            {filters[k].includes(a) &&
                                                <svg width={15} height={15} stroke="black" strokeWidth={1}>
                                                    <line x1={2} y1={2} x2={13} y2={13} />
                                                    <line x1={2} y1={13} x2={13} y2={2} />
                                                </svg>
                                            }
                                        </li>)
                                    }
                                </ul>
                            }
                        </HiddenSub>
                    )
                }
                <HiddenSub title={"Price"} initialVisibility={filters && filters.minPrice && filters.maxPrice}>
                    <div className={style.filterPriceContainer}>
                        <ProductFilterSlider changePrices={changePrices} initialValues={initialPrices ?? { min: '', max: '' }} minPrice={filters.minPrice} maxPrice={filters.maxPrice} />
                    </div>
                </HiddenSub>
            </div>
        </aside>
    )
}