import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'



const Nav = () => {
    const router = useRouter()
    const [user, setUser] = useState("");

    const handleUserInput = () => {
        if (user == "") {
            null
        } else {
            router.push(`/logs/${user}`)
        }
    }

    return (
        <div className={styles.nav}>
            <nav className={styles.navBar}>
                <ul>
                    <li>
                        <Link href="/">
                            <a className={styles.navButton}>
                                <span className="material-icons">home</span>
                                <p className={styles.navText}>Home</p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/clips">
                            <a className={styles.navButton}>
                                <span className="material-icons">movie</span>
                                <p className={styles.navText}>Clips</p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs">
                            <a className={styles.navButton}>
                                <span className="material-icons">description</span>
                                <p className={styles.navText}>Documentation</p>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.options}>
                <div className={styles.search}>
                    <a className={styles.navButton} onClick={() => handleUserInput()}>
                        <span className="material-icons">search</span>
                        <p className={styles.navText}>Search</p>
                    </a>
                    <input placeholder="Enter Twitch Chat Username" value={user} onChange={(e) => {setUser(e.target.value)}}required/>
                </div>
                <a className={styles.navButton}>
                    <span className="material-icons">more_vert</span>
                    <p className={styles.navText}>More</p>
                </a>
            </div>
        </div>
    )
}

export default Nav


