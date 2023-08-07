import { useRef } from 'react'
import style from './style.module.css'
import { MAX_PRICE_DEFAULT } from './constants'

export const ProductFilterSlider = ({ changeFilterHandler }) => {
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

        changeFilterHandler(null, id, Math.trunc((Number(dragItem.current.style.cx) + adjustment) * (MAX_PRICE_DEFAULT / 200)))
    }

    const dragStart = e => {
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

    const dragEnd = e => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', dragEnd)
    };

    return (
        <div className={style.filterPriceSlider}>
            <svg width={200} height={20}>
                <line x1={10} y1={10} x2={190} y2={10} stroke="gray" strokeWidth={10} />
                <circle ref={leftCircle} id="minPrice" onMouseDown={dragStart} cx={10} cy={10} r={10} fill="green" />
                <circle ref={rightCircle} id="maxPrice" onMouseDown={dragStart} cx={190} cy={10} r={10} fill="red" />
            </svg>
        </div>
    )
}