import { useEffect, useRef } from 'react'
import style from './style.module.css'
import { useQueryParams } from '../common/hooks/useQueryParams'

export const ProductFilterSlider = ({ changePrices, initialValues: { min, max } }) => {

    const { queryParamsObj } = useQueryParams()

    const priceRef = useRef()
    const minPriceRef = useRef()
    const maxPriceRef = useRef()

    const leftCircle = useRef()
    const rightCircle = useRef()

    useEffect(() => {
        if ((queryParamsObj?.minPrice || queryParamsObj?.maxPrice) && min && max) {
            leftCircle.current.value =
                queryParamsObj.minPrice &&
                    queryParamsObj.minPrice <= max &&
                    queryParamsObj.minPrice >= min &&
                    queryParamsObj.minPrice < (queryParamsObj.maxPrice || max)
                    ? queryParamsObj.minPrice : Math.floor(min)

            rightCircle.current.value =
                queryParamsObj.maxPrice &&
                    queryParamsObj.maxPrice <= max &&
                    queryParamsObj.maxPrice >= min &&
                    queryParamsObj.maxPrice > (queryParamsObj.minPrice || min)
                    ? queryParamsObj.maxPrice : Math.ceil(max)

            if (max === min) {
                minPriceRef.current.value = Math.floor(min)
                maxPriceRef.current.value = Math.ceil(max)
            } else {
                minPriceRef.current.value = Math.floor((queryParamsObj.minPrice && queryParamsObj.minPrice > min) ? queryParamsObj.minPrice : min)
                maxPriceRef.current.value = Math.ceil((queryParamsObj.maxPrice && queryParamsObj.maxPrice < max) ? queryParamsObj.maxPrice : max)
            }
        } else if (leftCircle.current && rightCircle.current && max && min) {
            minPriceRef.current.value = Math.floor(min)
            maxPriceRef.current.value = Math.ceil(max)
            leftCircle.current.value = Math.floor(min)
            rightCircle.current.value = Math.ceil(max)
        }
    }, [queryParamsObj, min, max])

    const onSliderValueChange = e => {
        if (e.target.name === 'minPrice' && leftCircle.current.value > rightCircle.current.value - 10) {
            leftCircle.current.value = rightCircle.current.value - 10
        } else if (e.target.name === 'maxPrice' && rightCircle.current.value < Number(leftCircle.current.value) + 10) {
            rightCircle.current.value = Number(leftCircle.current.value) + 10
        }

        priceRef.current = e.target.name === 'minPrice' ? minPriceRef.current : maxPriceRef.current

        priceRef.current.value = e.target.value
    }

    const dragStart = e => {
        window.addEventListener('mouseup', dragEnd)
    };

    const dragEnd = e => {
        window.removeEventListener('mouseup', dragEnd)

        changePrices(Number(minPriceRef.current.value), Number(maxPriceRef.current.value))
    };

    return (
        <>
            <div className={style.filterPriceSlider}>
                <input name='minPrice' ref={leftCircle} type='range' onMouseDown={dragStart} min={Math.floor(min)} max={Math.ceil(max)} onChange={onSliderValueChange} />
                <input name='maxPrice' ref={rightCircle} type='range' onMouseDown={dragStart} min={Math.floor(min)} max={Math.ceil(max)} onChange={onSliderValueChange} />
            </div>

            <div className={style.filterPriceSliderValues}>
                <div>
                    <label>min</label>
                    <input className={style.priceRangeInput} ref={minPriceRef} type="number" name="minPrice" min={0} max={1000} disabled />
                </div>
                <div>
                    <label>max</label>
                    <input className={style.priceRangeInput} ref={maxPriceRef} type="number" name="maxPrice" min={0} max={1000} disabled />
                </div>
            </div>
        </>
    )
}