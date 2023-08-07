import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { MAX_PRICE_DEFAULT, SHOW_PRODUCTS_DEFAULT } from "./constants"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import style from './style.module.css'
import { getProducts } from "../../data/services/productService"
import { useParams } from "react-router-dom"

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
            if (windowWidth < 700 && queryParamsObj.show > 5) {
                queryParamsObj.show = 5
                setFilters(state => ({ ...state, ...queryParamsObj }));
            }
            else
                setFilters(state => ({ ...state, ...queryParamsObj }));
        }
    }, [catId, queryParamsObj, windowWidth])

    useEffect(() => {
        getProducts({ catId, ...filters })
            .then(data => setPotentialProdsCount(data.totalCount))
    }, [filters, catId])

    const changeFilterHandler = e => {
        setFilters(state => ({ ...state, [e.target.name]: e.target.value }))
    }

    const submitFiltersHandler = useCallback(e => {
        e.preventDefault()

        setQueryParams({ ...queryParamsObj, ...filters, skip: 0 })
    }, [setQueryParams, filters, queryParamsObj])

    const dragItem = useRef()
    const leftCircle = useRef()
    const rightCircle = useRef()

    const mouseMoveHandler = e => {
        if (!dragItem.current) return
        dragItem.current.style.cx = e.clientX - dragItem.current.startPositionX + dragItem.current.startCx

        const currentCx = Number(dragItem.current.style.cx)
        const cxBaseVal = dragItem.current.cx.baseVal.value

        const id = dragItem.current.id

        const borderCircle = id === 'minPrice' ? rightCircle.current : leftCircle.current
        const adjustment = id === 'minPrice' ? - dragItem.current.radius : dragItem.current.radius
        const border = (Number(borderCircle.style.cx) || borderCircle.cx.baseVal.value) + adjustment / 2

        if (id === 'minPrice') {
            if (currentCx < cxBaseVal) dragItem.current.style.cx = cxBaseVal
            else if (currentCx > border) dragItem.current.style.cx = border
        } else {
            if (currentCx > cxBaseVal) dragItem.current.style.cx = cxBaseVal
            else if (currentCx < border) dragItem.current.style.cx = border
        }

        setFilters(state => ({ ...state, [id]: Math.trunc((Number(dragItem.current.style.cx) + adjustment) * (MAX_PRICE_DEFAULT / 200)) }))
    }

    const dragStart = (e) => {
        dragItem.current = e.target;
        dragItem.current.startPositionX = dragItem.current.getBoundingClientRect().left
        dragItem.current.radius = dragItem.current.r.baseVal.value

        dragItem.current.startCx =
            Number(dragItem.current.style.cx)
                ? Number(dragItem.current.style.cx) - dragItem.current.radius
                : dragItem.current.cx.baseVal.value - dragItem.current.radius

        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', dragEnd)
    };

    const dragEnd = (e) => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', dragEnd)
    };

    return (
        <aside className={style.filtersContainer}>
            <h3>FILTERS</h3>
            <form className={style.filterForm} onSubmit={submitFiltersHandler}>
                <div>
                    <label htmlFor="showFilter">Show </label>
                    <select id="showFilter" name="show" value={filters.show} onChange={changeFilterHandler}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>

                <div className={style.filterPriceContainer}>
                    <label>Price</label>
                    <div className={style.filterPriceSlider}>
                        <svg width={200} height={20}>
                            <line x1={10} y1={10} x2={190} y2={10} stroke="gray" strokeWidth={10} />
                            <circle ref={leftCircle} id="minPrice" onMouseDown={dragStart} cx={10} cy={10} r={10} fill="green" />
                            <circle ref={rightCircle} id="maxPrice" onMouseDown={dragStart} cx={190} cy={10} r={10} fill="red" />
                        </svg>
                    </div>

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