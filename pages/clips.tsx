import Head from 'next/head'
import Nav from '../components/Nav'
import styles from '../styles/Clips.module.css'

export default function Clips() {
    return (
        <div>
            <Head>
                <title>The Den | Clips</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            <Nav/>
            <div className={styles.clips}>
                <div className={styles.card}>
                    
                </div>
                <div className={styles.card}>
                    
                </div>
                <div className={styles.card}>
                    
                </div>
            </div>
        </div>
    )
}