import { useCallback, useContext } from 'react'
import { CartContext } from '../common/contexts/CartContext'

import style from './style.module.css'

export const ProductTile = ({ product }) => {
    const { addToCart } = useContext(CartContext)

    const addToCartHandler = useCallback(async () => {
        await addToCart(product, 1)
        window.alert(`${product.name} added to cart!`)
    }, [addToCart, product])

    return (
        <div className={style.productTile}>
            <div className={style.productTileImgContainer}>
                <div>
                    <img src={'/images/' + product.thumbnail} alt={product.name} />
                </div>
            </div>

            <div className={style.productTileContentContainer}>
                <h3>{product.name}</h3>
                <p>{product.description.length < 25 ? product.description : product.description.substring(0, 25) + '...'}</p>

                <p><strong>{product.price.toFixed(2)}$</strong></p>

                <p>{'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}</p>
            </div>

            <button onClick={addToCartHandler} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <svg stroke='black' strokeWidth={2} height="25" width="25" fill='rgb(245, 245, 245)'>
                    <path d="M19 7 L20 4 L23 4" />

                    <path d="M1 7 L19 7 L16 15 L2 15 Z" />

                    <path d="M2 18 L16 18" />

                    <circle r={1} cx={5} cy={21} />
                    <circle r={1} cx={13} cy={21} />
                </svg>
                <span>
                    ADD TO CART
                </span>
            </button>
        </div>
    )
}