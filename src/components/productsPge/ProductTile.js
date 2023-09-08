import { useCallback, useContext } from 'react'
import { CartContext } from '../common/contexts/CartContext'

import style from './style.module.css'
import { CartSVG } from '../common/helpers/CartSVG'
import { DimensionsContext } from '../common/contexts/dimensionsContext/DimensionsContext'
import { AlertContext } from '../common/contexts/alertContext/AlertContext'
import { trimText } from './util'
import { CRITICAL_WIDTH } from './constants'
import { ROOT_DIR } from '../../constants'

export const ProductTile = ({ product }) => {
    const { addToCart, cartDropDownRef } = useContext(CartContext)

    const { showAlert } = useContext(AlertContext)

    const { windowWidth } = useContext(DimensionsContext)

    const addToCartHandler = useCallback(async () => {
        const alreadyIn = await addToCart(product, 1)

        if (windowWidth > 550) {
            cartDropDownRef.current.style.display = 'block'
        }

        showAlert({ content: alreadyIn ? `${product.name} is already added!` : `Added ${product.name} to cart!` })
    }, [addToCart, cartDropDownRef, product, showAlert, windowWidth])

    return (
        <div style={{ position: windowWidth <= CRITICAL_WIDTH ? 'relative' : '' }} className={style.productTile}>
            <div className={style.productTileImgContainer}>
                <div>
                    <img src={ROOT_DIR + product.thumbnail} alt={product.name} />
                </div>
            </div>

            <div className={style.productTileContentContainer}>
                <h3>{trimText(product.name, 20)}</h3>
                <p>{trimText(product.description, 28)}</p>

                <p><strong>{product.price.toFixed(2)}$</strong></p>

                <p>{'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}</p>
            </div>

            <div style={windowWidth <= CRITICAL_WIDTH ? { position: 'absolute', bottom: '2%', right: '4%' } : {}}>
                <button className={style.addToCartBtn} onClick={addToCartHandler}>
                    <span>
                        {windowWidth > CRITICAL_WIDTH
                            ? 'ADD TO CART'
                            : 'ADD'
                        }
                    </span>
                    <div style={{ width: windowWidth > CRITICAL_WIDTH ? '20px' : '15px', display: 'flex' }}>
                        <CartSVG />
                    </div>
                </button>
            </div>
        </div>
    )
}