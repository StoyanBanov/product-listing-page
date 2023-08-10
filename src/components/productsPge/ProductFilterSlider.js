import { useEffect, useRef } from 'react'
import style from './style.module.css'
import { useQueryParams } from '../common/hooks/useQueryParams'
import { MAX_PRICE_DEFAULT } from './constants'
import { isPriceValid } from './util'

export const ProductFilterSlider = ({ changePrices, initialValues: { min, max } }) => {

    const { queryParamsObj } = useQueryParams()

    const priceRef = useRef()
    const minPriceRef = useRef()
    const maxPriceRef = useRef()

    const leftCircle = useRef()
    const rightCircle = useRef()

    useEffect(() => {
        if (max && min) {
            const minBorder = Math.floor(min)
            const maxBorder = Math.ceil(max)

            if (max === min || (queryParamsObj && !queryParamsObj.minPrice && !queryParamsObj.maxPrice)) {
                minPriceRef.current.value = minBorder
                maxPriceRef.current.value = maxBorder
                leftCircle.current.value = minBorder
                rightCircle.current.value = maxBorder

            } else if (queryParamsObj && (queryParamsObj.minPrice || queryParamsObj.maxPrice)) {
                const minPrc = (queryParamsObj.minPrice || min)
                const maxPrc = (queryParamsObj.maxPrice || max)

                const minPriceValue = isPriceValid(minPrc, maxPrc, min) ? minPrc : minBorder

                const maxPriceValue = isPriceValid(maxPrc, max, minPrc) ? maxPrc : maxBorder

                leftCircle.current.value = minPriceValue
                minPriceRef.current.value = minPriceValue

                rightCircle.current.value = maxPriceValue
                maxPriceRef.current.value = maxPriceValue
            }
        }
    }, [queryParamsObj, min, max])

    const onSliderValueChange = e => {
        const priceSide = e.target.name === 'minPrice'

        let border
        if (priceSide && leftCircle.current.value > (border = rightCircle.current.value - 10)) {
            leftCircle.current.value = border
        } else if (!priceSide && rightCircle.current.value < (border = Number(leftCircle.current.value) + 10)) {
            rightCircle.current.value = border
        }

        priceRef.current = priceSide ? minPriceRef.current : maxPriceRef.current

        priceRef.current.value = e.target.value
    }

    const dragStart = () => {
        window.addEventListener('mouseup', dragEnd)
        window.addEventListener('touchend', dragEnd)
    }

    const dragEnd = () => {
        window.removeEventListener('mouseup', dragEnd)
        window.removeEventListener('touchend', dragEnd)

        changePrices(Number(minPriceRef.current.value), Number(maxPriceRef.current.value))
    }

    return (
        <>
            <div className={style.filterPriceSlider}>
                <input name='minPrice' ref={leftCircle} type='range' onTouchStart={dragStart} onMouseDown={dragStart} min={Math.floor(min)} max={Math.ceil(max)} onChange={onSliderValueChange} disabled={min === max} />
                <input name='maxPrice' ref={rightCircle} type='range' onTouchStart={dragStart} onMouseDown={dragStart} min={Math.floor(min)} max={Math.ceil(max)} onChange={onSliderValueChange} disabled={min === max} />
            </div>

            <div className={style.filterPriceSliderValues}>
                <div>
                    <label>min</label>
                    <input className={style.priceRangeInput} ref={minPriceRef} type="number" name="minPrice" min={0} max={MAX_PRICE_DEFAULT} disabled />
                </div>
                <div>
                    <label>max</label>
                    <input className={style.priceRangeInput} ref={maxPriceRef} type="number" name="maxPrice" min={0} max={MAX_PRICE_DEFAULT} disabled />
                </div>
            </div>
        </>
    )
}