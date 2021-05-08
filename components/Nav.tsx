import { useState } from 'react'
import styles from '../styles/Nav.module.css'



const Nav = () => {
    const [open, setOpen] = useState(false)

    function handleSideBar() {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className={styles.nav}>
            <div className={styles.search}>
                <a className={styles.navButton} onClick={() => handleSideBar()}>
                    <span className="material-icons">menu</span>
                </a>
                <nav className={open ? styles.navMenuActive : styles.navMenuUnActive}>
                    <div className={styles.navMenuW}>
                        <a className={styles.navButton} onClick={() => handleSideBar()}>
                            <span className="material-icons">menu</span>
                        </a>
                    </div>
                    <ul>
                        <li>Home</li>
                        <li>Clips</li>
                        <li>Docs</li>
                    </ul>
                </nav>
            </div>
            <div className={styles.options}>
                <span className="material-icons">search</span>
                <span className="material-icons">more_vert</span>
            </div>
        </div>
    )
}

export default Nav


