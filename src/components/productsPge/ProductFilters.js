import { useCallback, useContext, useEffect, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"
import { SHOW_PRODUCTS_DEFAULT } from "./constants"
import { DimensionsContext } from "../common/contexts/dimensionsContext/DimensionsContext"

export const ProductFilters = () => {
    const [filters, setFilters] = useState({
        show: SHOW_PRODUCTS_DEFAULT
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

    return (
        <aside>
            <form onSubmit={submitFiltersHandler}>
                <select name="show" value={filters.show} onChange={changeFilterHandler}>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
                <button>Filter</button>
            </form>
        </aside>
    )
}