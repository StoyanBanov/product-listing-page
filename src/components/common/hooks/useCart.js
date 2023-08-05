import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"

export const useCart = () => {
    const { cart, emptyCart } = useContext(CartContext)

    const navigate = useNavigate()

    const purchaseClickHandler = useCallback(() => {
        navigate('/purchase')
    }, [navigate])

    const emptyCartClickHandler = useCallback(() => {
        emptyCart(cart._id)
    }, [emptyCart, cart._id])

    return {
        cart,
        purchaseClickHandler,
        emptyCartClickHandler
    }
}