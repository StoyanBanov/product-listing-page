import style from './style.module.css'

export const ProductTile = ({ product }) => {



    return (
        <div className={style.productTile}>
            <img src={'/images/' + product.thumbnail} alt={product.name} />

            <div>

                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <p><strong>{product.price.toFixed(2)}$</strong></p>

                <p>{'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}</p>
            </div>

            <button style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <svg stroke='black' strokeWidth={2} height="26" width="25" fill='rgb(245, 245, 245)'>
                    <path d="M19 7 L20 4 L23 4" />

                    <path d="M1 7 L19 7 L16 15 L2 15 Z" />

                    <path d="M2 18 L16 18" />

                    <circle r={1} cx={5} cy={22} />
                    <circle r={1} cx={13} cy={22} />
                </svg>
                ADD TO CART
            </button>
        </div>
    )
}