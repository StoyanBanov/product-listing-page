import { CartItem } from "./CartItem"
import { useCart } from "../common/hooks/useCart"

import style from './style.module.css'

export const Cart = () => {
    const { cart, purchaseClickHandler, emptyCartClickHandler } = useCart()

    return (
        <div className={style.cart}>
            <h2>cart</h2>
            {cart?.items?.map((itemObj) => <CartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p><strong>Total: {cart.totalPrice}$</strong></p>
            <button onClick={purchaseClickHandler}>Purchase</button>
            <button onClick={emptyCartClickHandler}>Empty</button>
        </div>
    )
}