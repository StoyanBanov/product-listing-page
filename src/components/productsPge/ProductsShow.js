import { useCallback, useContext, useEffect, useState } from 'react'
import { useQueryParams } from '../common/hooks/useQueryParams'
import { MAX_SHOW_PER_WIDTH, SHOW_PRODUCTS_DEFAULT } from './constants'

import style from './style.module.css'
import { DimensionsContext } from '../common/contexts/dimensionsContext/DimensionsContext'
import { setCorrectShowValue } from './util'

export const ProductsShow = () => {
    const { queryParamsObj, setQueryParams } = useQueryParams()

    const [show, setShow] = useState(SHOW_PRODUCTS_DEFAULT)

    const { windowWidth } = useContext(DimensionsContext)

    useEffect(() => {
        if (queryParamsObj) {
            setShow(setCorrectShowValue(queryParamsObj.show, windowWidth))
        }
    }, [queryParamsObj, windowWidth])

    const showChangeHandler = useCallback(({ target: { value } }) => {
        setQueryParams({ ...queryParamsObj, show: value, skip: 0 })
    }, [queryParamsObj, setQueryParams])

    const showWidths = Object.keys(MAX_SHOW_PER_WIDTH).map(Number).sort((a, b) => a - b)

    return (
        <div className={style.showContainer}>
            <label htmlFor="showFilter">Show</label>
            <select id="showFilter" name="show" value={show} onChange={showChangeHandler}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                {
                    showWidths.slice(0, showWidths.findIndex(b => b >= windowWidth) + 1).map((s, i) => <option key={i} value={MAX_SHOW_PER_WIDTH[s]}>{MAX_SHOW_PER_WIDTH[s]}</option>)
                }
            </select>
        </div>
    )
}