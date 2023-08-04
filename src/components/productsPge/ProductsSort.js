import { useCallback, useEffect, useState } from "react"
import { useQueryParams } from "../common/hooks/useQueryParams"


export const ProductsSort = () => {
    const { queryParamsObj, setQueryParams } = useQueryParams()

    const [sort, setSort] = useState('name asc')

    useEffect(() => {
        if (queryParamsObj?.sortBy) {
            setSort(queryParamsObj.sortBy + ' ' + queryParamsObj.order)
        }
    }, [queryParamsObj])

    const sortChangeHandler = useCallback(({ target: { value } }) => {
        const [sortBy, order] = value.split(' ')
        setQueryParams({ ...queryParamsObj, sortBy, order, skip: 0 })
    }, [queryParamsObj, setQueryParams])

    return (
        <div>
            <label htmlFor="sortSelect">Sort by</label>
            <select id="sortSelect" name="sort" value={sort} onChange={sortChangeHandler}>
                <option value={'price desc'}>price descending</option>
                <option value={'price asc'}>price ascending</option>

                <option value={'name asc'}>alphabetical a-z</option>
                <option value={'name desc'}>alphabetical z-a</option>

                <option value={'rating desc'}>rating</option>
            </select>
        </div>
    )
}