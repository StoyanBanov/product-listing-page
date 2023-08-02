import style from './style.module.css'

export const ProductTile = ({ product }) => {
    return (
        <div className={style.productTile}>
            <img src={'/images/' + product.thumbnail} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <p><strong>{product.price.toFixed(2)}$</strong></p>
        </div>
    )
}