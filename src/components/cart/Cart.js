import { CartItem } from "./CartItem"
import { useCart } from "../common/hooks/useCart"

import style from './style.module.css'

export const Cart = () => {
    const { cart, purchaseClickHandler, emptyCartClickHandler } = useCart()

    return (
        <div className={style.cart}>
            <h1>cart</h1>
            {cart?.items?.map((itemObj) => <CartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p>Total: {cart.totalPrice}</p>
            <button onClick={purchaseClickHandler}>Purchase</button>
            <button onClick={emptyCartClickHandler}>Empty</button>
        </div>
    )
}