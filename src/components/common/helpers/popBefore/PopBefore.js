import style from './style.module.css'

export const PopBefore = ({ displayCategoriesClickHandler }) => {
    return (
        <div onClick={() => displayCategoriesClickHandler(false)} className={style.popBefore} />
    )
}