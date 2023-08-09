import { createContext, useState } from "react";

import style from './style.module.css'

export const AlertContext = createContext()

export const AlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        title: 'Alert',
        content: '',
        visibility: false
    })

    const showAlert = (alert) => {
        setAlert(state => ({ ...state, ...alert, visibility: true }))

        setTimeout(() => {
            setAlert({
                title: 'Alert',
                content: '',
                visibility: false
            })
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{
            showAlert
        }}>
            {alert.visibility &&
                <div className={style.alertContainer}>
                    <div className={style.alert}>
                        <h2>{alert.title}</h2>
                        <p>
                            {alert.content}
                        </p>
                    </div>
                </div>
            }
            {children}
        </AlertContext.Provider>
    )
}