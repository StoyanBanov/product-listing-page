import { createContext, useState } from "react";

import style from './style.module.css'

export const AlertContext = createContext()

export const AlertContextProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([])

    const showAlert = (alert) => {
        setAlerts(state => [...state, alert])

        setTimeout(() => {
            setAlerts(state => state.filter(a => a !== alert))
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{
            showAlert
        }}>
            {alerts.length > 0 &&
                <div className={style.alertsList}>
                    {
                        alerts.map((a, i) =>
                            <div key={i} className={style.alertContainer}>
                                <div className={style.alert}>
                                    <h2>{a.title ?? 'Alert'}</h2>
                                    <p>
                                        {a.content}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
            {children}
        </AlertContext.Provider>
    )
}