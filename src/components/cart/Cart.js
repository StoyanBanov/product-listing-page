import { CartItem } from "./CartItem"
import { useCart } from "../common/hooks/useCart"

import style from './style.module.css'

export const Cart = () => {
    const { cart, emptyCartClickHandler } = useCart()

    return (
        <div className={style.cart}>
            <h2>Cart</h2>

            {cart?.items?.map((itemObj) => <CartItem key={itemObj.item._id} itemObj={itemObj} />)}

            <p><strong>Total: {cart.totalPrice}$</strong></p>

            {cart.items && cart.items.length > 0 &&
                <>
                    <button>Purchase</button>
                    <button className={style.cartEmptyBtn} onClick={emptyCartClickHandler}>Empty</button>
                </>
            }
        </div>
    )
}