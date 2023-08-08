import { useCallback, useState } from 'react'
import style from './style.module.css'

export const HiddenSub = ({ children, title, initialVisibility = false }) => {
    const [itemsVisibility, setItemsVisibility] = useState(initialVisibility)

    const showNavItemHandler = useCallback(e => {
        setItemsVisibility(state => !state)
    }, [])

    return (
        <div className={style.hiddenSubContainer}>
            <div id="categories" onClick={showNavItemHandler} className={style.hiddenSubTop}>
                <div>
                    <span>{title}</span>
                </div>

                <svg width={18} height={18} fill="none" stroke="black" strokeWidth={2}>
                    {itemsVisibility
                        ? <path d={'M2 2 L9 14 L16 2'} />
                        : <path d={'M12 2 L2 9 L12 16'} />
                    }
                </svg>
            </div>

            {itemsVisibility &&
                <div className={style.hiddenSubBot}>
                    {children}
                </div>
            }
        </div>
    )
}