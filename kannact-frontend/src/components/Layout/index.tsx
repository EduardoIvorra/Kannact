import { Link, Outlet } from "react-router"
import styles from "./index.module.css"
import { Routes } from "../../routes"
import { IoIosLogOut } from "react-icons/io"
import Logo from "../../assets/kannact-logo.png"

const Layout = () => {
    return (
        <>
            <header className={styles.header__layout}>
                <nav className={styles.nav}>
                    <Link className={styles.wrapper__logo} to={Routes.Home}>
                        <img src={Logo} />
                    </Link>
                    <ul className={styles.nav__links}>
                        <li className={styles.nav__link}>
                            <IoIosLogOut size={14} /> Logout
                        </li>
                    </ul>
                </nav>
            </header>

            <main className={styles.main__layout}>
                <Outlet />
            </main>

            <footer className={styles.footer__layout}>
                <p>&copy; Kannact.</p>
            </footer>
        </>
    )
}

export default Layout
