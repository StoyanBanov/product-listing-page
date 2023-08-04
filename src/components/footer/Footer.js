import { Link } from "react-router-dom"

import style from './style.module.css'

export const Footer = () => {
    return (
        <footer className={style.footerContainer}>
            <Link to={'/'}>T&C</Link>
            <Link to={'/'}>Privacy Policy</Link>
            <Link to={'/'}>Contact Us</Link>
        </footer>
    )
}