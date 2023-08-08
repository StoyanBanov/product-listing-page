import { useEffect, useRef } from 'react'
import style from './style.module.css'
import { useQueryParams } from '../common/hooks/useQueryParams'

const leftStart = 10
const rightStart = 190

export const ProductFilterSlider = ({ changePrices, initialValues: { min, max } }) => {

    const { queryParamsObj } = useQueryParams()

    const priceRef = useRef()
    const minPriceRef = useRef()
    const maxPriceRef = useRef()

    const dragItem = useRef()
    const leftCircle = useRef()
    const rightCircle = useRef()

    useEffect(() => {
        if ((queryParamsObj?.minPrice || queryParamsObj?.maxPrice) && min && max) {
            leftCircle.current.style.cx =
                queryParamsObj.minPrice &&
                    queryParamsObj.minPrice <= max &&
                    queryParamsObj.minPrice >= min &&
                    queryParamsObj.minPrice < (queryParamsObj.maxPrice || max)
                    ? (queryParamsObj.minPrice - Math.trunc(min)) / (Math.ceil(max) / 200) + 10 : ''

            rightCircle.current.style.cx =
                queryParamsObj.maxPrice &&
                    queryParamsObj.maxPrice <= max &&
                    queryParamsObj.maxPrice >= min &&
                    queryParamsObj.maxPrice > (queryParamsObj.minPrice || min)
                    ? (queryParamsObj.maxPrice - Math.floor(min)) / (Math.ceil(max) / 200) - 10 : ''

            if (max === min) {
                minPriceRef.current.value = max
                maxPriceRef.current.value = max
            } else {
                minPriceRef.current.value = Math.floor((queryParamsObj.minPrice && queryParamsObj.minPrice > min) ? queryParamsObj.minPrice : min)
                maxPriceRef.current.value = Math.ceil((queryParamsObj.maxPrice && queryParamsObj.maxPrice < max) ? queryParamsObj.maxPrice : max)
            }
        } else if (leftCircle.current && rightCircle.current && max && min) {
            minPriceRef.current.value = Math.floor(min)
            maxPriceRef.current.value = Math.ceil(max)
        }
    }, [queryParamsObj, min, max])

    const mouseMoveHandler = e => {
        if (!dragItem.current) return
        dragItem.current.style.cx = e.clientX - dragItem.current.startPositionX + dragItem.current.startCx

        const currentCx = Number(dragItem.current.style.cx)

        const id = dragItem.current.id

        const borderCircle = id === 'minPrice' ? rightCircle.current : leftCircle.current
        const adjustment = id === 'minPrice' ? - dragItem.current.radius : dragItem.current.radius
        const border = (Number(borderCircle.style.cx) || borderCircle.cx.baseVal.value) + adjustment / 2

        if (id === 'minPrice') {
            if (currentCx < leftStart) dragItem.current.style.cx = leftStart
            else if (currentCx > border) dragItem.current.style.cx = border
        } else {
            if (currentCx > rightStart) dragItem.current.style.cx = rightStart
            else if (currentCx < border) dragItem.current.style.cx = border
        }

        const calculation = (Number(dragItem.current.style.cx) + adjustment) * ((max - min) / 200) + min
        priceRef.current.value = id === 'minPrice' ? Math.trunc(calculation) : Math.ceil(calculation)
    }

    const dragStart = e => {
        dragItem.current = e.target;
        dragItem.current.startPositionX = dragItem.current.getBoundingClientRect().left
        dragItem.current.radius = dragItem.current.r.baseVal.value

        dragItem.current.startCx =
            Number(dragItem.current.style.cx)
                ? Number(dragItem.current.style.cx) - dragItem.current.radius
                : dragItem.current.cx.baseVal.value - dragItem.current.radius

        priceRef.current = document.getElementsByName(e.target.id)[0]

        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', dragEnd)
    };

    const dragEnd = e => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', dragEnd)

        changePrices(Number(minPriceRef.current.value), Number(maxPriceRef.current.value))
    };

    return (
        <>
            <div className={style.filterPriceSlider}>
                <svg width={200} height={20}>
                    <line x1={10} y1={10} x2={190} y2={10} stroke="gray" strokeWidth={5} />
                    <circle ref={leftCircle} id="minPrice" onMouseDown={dragStart} cx={10} cy={10} r={10} fill={max !== min ? "green" : "gray"} />
                    <circle ref={rightCircle} id="maxPrice" onMouseDown={dragStart} cx={190} cy={10} r={10} fill={max !== min ? "red" : "gray"} />
                </svg>
            </div>

            <div>
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