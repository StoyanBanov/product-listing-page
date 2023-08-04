import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { SHOW_PRODUCTS_DEFAULT } from "./constants"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

import style from './style.module.css'

export const ProductFilters = () => {
    const [filters, setFilters] = useState({
        show: SHOW_PRODUCTS_DEFAULT,
        minPrice: 0,
        maxPrice: 10000,
        search: ''
    })

    const { queryParamsObj, setQueryParams } = useQueryParams()

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        if (windowWidth) {
            if (windowWidth < 700)
                setFilters(state => ({ ...state, ...queryParamsObj, show: 5 }));
            else
                setFilters(state => ({ ...state, ...queryParamsObj }));
        }
    }, [queryParamsObj, windowWidth])

    const changeFilterHandler = useCallback(e => {
        setFilters(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const submitFiltersHandler = useCallback(e => {
        e.preventDefault()

        setQueryParams({ ...queryParamsObj, ...filters, skip: 0 })
    }, [setQueryParams, filters, queryParamsObj])

    const dragItem = useRef()
    const leftCircle = useRef()
    const rightCircle = useRef()

    const mouseMoveHandler = e => {
        dragItem.current.style.cx = e.clientX
        if (dragItem.current.id === 'leftCircle') {
            const border = (Number(rightCircle.current.style.cx) || 90) - 10

            if (e.clientX < 10) dragItem.current.style.cx = 10
            else if (e.clientX > border) dragItem.current.style.cx = border

            setFilters(state => ({ ...state, minPrice: (Number(dragItem.current.style.cx) - 10) * 100 }))
        } else if (dragItem.current.id === 'rightCircle') {
            const border = (Number(leftCircle.current.style.cx) || 10) + 10

            if (e.clientX > 90) dragItem.current.style.cx = 90
            else if (e.clientX < border) dragItem.current.style.cx = border

            setFilters(state => ({ ...state, maxPrice: (Number(dragItem.current.style.cx) + 10) * 100 }))
        }
    }

    const dragStart = (e) => {
        dragItem.current = e.target;
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', dragEnd)
    };

    const dragEnd = (e) => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', dragEnd)
        dragItem.current = null
    };

    return (
        <aside>
            <h3>Filters</h3>
            <form className={style.filterForm} onSubmit={submitFiltersHandler}>
                <select name="show" value={filters.show} onChange={changeFilterHandler}>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>

                <div className={style.filterPriceSlider}>
                    <svg width={100} height={20}>
                        <line x1={10} y1={10} x2={90} y2={10} stroke="gray" strokeWidth={10} />
                        <circle ref={leftCircle} id="leftCircle" onMouseDown={dragStart} cx={10} cy={10} r={10} fill="green" />
                        <circle ref={rightCircle} id="rightCircle" onMouseDown={dragStart} cx={90} cy={10} r={10} fill="red" />
                    </svg>
                </div>
                <div>
                    <label>min</label>
                    <input type="number" name="minPrice" min={0} max={10000} value={filters.minPrice} onChange={changeFilterHandler} disabled />

                    <label>max</label>
                    <input type="number" name="maxPrice" min={0} max={10000} value={filters.maxPrice} onChange={changeFilterHandler} disabled />
                </div>

                <div>
                    <label>search</label>
                    <input name="search" value={filters.search} onChange={changeFilterHandler} />
                </div>

                <button>Filter</button>
            </form>
        </aside>
    )
}