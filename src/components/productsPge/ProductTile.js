import { useCallback, useContext } from 'react'
import { CartContext } from '../common/contexts/CartContext'

import style from './style.module.css'
import { CartSVG } from '../common/helpers/CartSVG'
import { DimensionsContext } from '../common/contexts/dimensionsContext/DimensionsContext'
import { AlertContext } from '../common/contexts/alertContext/AlertContext'

export const ProductTile = ({ product }) => {
    const { addToCart } = useContext(CartContext)

    const { showAlert } = useContext(AlertContext)

    const addToCartHandler = useCallback(async () => {
        const alreadyIn = await addToCart(product, 1)

        showAlert({ content: alreadyIn ? `${product.name} is already added!` : `Added ${product.name} to cart!` })
    }, [addToCart, product, showAlert])

    const { windowWidth } = useContext(DimensionsContext)

    return (
        <div style={{ position: windowWidth <= 450 ? 'relative' : '' }} className={style.productTile}>
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

            <div style={windowWidth <= 450 ? { position: 'absolute', bottom: '2%', right: '4%' } : {}}>
                <button className={style.addToCartBtn} onClick={addToCartHandler}>
                    <span>
                        {windowWidth > 450
                            ? 'ADD TO CART'
                            : 'ADD'
                        }
                    </span>
                    <div style={{ width: windowWidth > 450 ? '20px' : '15px', display: 'flex' }}>
                        <CartSVG />
                    </div>
                </button>
            </div>
        </div>
    )
}