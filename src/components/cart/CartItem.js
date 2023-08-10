import { useContext } from 'react'
import style from './style.module.css'
import { CartContext } from '../common/contexts/CartContext'
import { trimText } from '../productsPge/util'
import { DimensionsContext } from '../common/contexts/dimensionsContext/DimensionsContext'
import { CRITICAL_WIDTH } from '../productsPge/constants'

export const CartItem = ({ itemObj: { item, count, _id } }) => {
    const { removeFromCart, changeItemCount } = useContext(CartContext)

    const { windowWidth } = useContext(DimensionsContext)

    const CountChangeHandler = e => {
        changeItemCount(item._id, e.target.value)
    }

    const RemoveItemHandler = () => {
        removeFromCart({ item, _id })
    }

    return (
        <div className={style.cartItemContainer}>
            <div className={style.cartItemTop}>
                <img src={'/images/' + item.thumbnail} alt={item.name} />
                <div>
                    <h4>{trimText(item.name, windowWidth >= CRITICAL_WIDTH ? 15 : 10)}</h4>
                    <span>{item.price.toFixed(2)}$</span>
                </div>
            </div>

            <div className={style.cartItemBot}>
                <input type='number' min={1} max={item.count} defaultValue={count} onChange={CountChangeHandler} />
                <button onClick={RemoveItemHandler}>
                    <svg width={20} height={20} stroke='black' strokeWidth={1}>
                        <line x1={2} y1={2} x2={18} y2={18} />
                        <line x1={2} y1={18} x2={18} y2={2} />
                    </svg>
                </button>
            </div>
        </div>
    )
}