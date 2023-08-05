import { createContext, useCallback, useEffect, useReducer, useRef } from "react";

export const CartContext = createContext()

const cartInitialState = { items: [], totalPrice: 0 }

export const CartContextProvider = ({ children }) => {
    const cartDropDownRef = useRef()

    const reducer = useCallback((state, action) => {
        let changedCart

        switch (action.type) {
            case 'setCart':
                changedCart = action.cart
                break
            case 'emptyCart':
                changedCart = { items: [] }
                break
            case 'addToCart':
                if (state.items.find(i => i.item._id === action.itemObj.item._id))
                    return state

                changedCart = {
                    items: [...state.items, action.itemObj]
                }
                break
            case 'removeFromCart':
                changedCart = {
                    items: state.items.filter(i => i.item._id !== action.itemId)
                }
                break
            case 'changeItemCount':
                const itemToChange = state.items.find(i => i.item._id === action.itemId)
                if (!itemToChange || action.newCount < 0 || itemToChange.item.count < action.newCount) return state

                changedCart = {
                    items:
                        [
                            ...state.items.slice(0, state.items.indexOf(itemToChange)),
                            {
                                ...itemToChange,
                                count: action.newCount
                            },
                            ...state.items.slice(state.items.indexOf(itemToChange) + 1)
                        ],
                }
                break
            default:
                return state;
        }

        changedCart.totalPrice = changedCart.items.reduce((total, i) => total + i.item.price * i.count, 0)

        sessionStorage.setItem('cart', JSON.stringify(changedCart))

        return changedCart
    }, [])

    const [cart, dispatch] = useReducer(reducer, { ...cartInitialState })

    useEffect(() => {
        let guestCart = JSON.parse(sessionStorage.getItem('cart'))
        if (guestCart) {
            dispatch({ type: 'setCart', cart: guestCart })
        } else {
            dispatch({ type: 'setCart', cart: { ...cartInitialState } })
        }
    }, [])

    const addToCart = useCallback(async (item, count = 1) => {
        dispatch({ type: 'addToCart', itemObj: { item, count } })

        cartDropDownRef.current.style.display = 'block'
    }, [])

    const removeFromCart = useCallback(async (itemObj) => {
        dispatch({ type: 'removeFromCart', itemId: itemObj.item._id })
    }, [])

    const emptyCart = useCallback(async () => {
        dispatch({ type: 'emptyCart' })
    }, [])

    const changeItemCount = useCallback(async (itemId, newCount) => {
        dispatch({ type: 'changeItemCount', itemId, newCount })
    }, [])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, changeItemCount, cartDropDownRef }}>
            {children}
        </CartContext.Provider>
    )
}