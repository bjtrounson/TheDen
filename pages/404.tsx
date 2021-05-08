import styles from '../styles/Logs.module.css'
import Head from 'next/head'
import Image from 'next/image'
export default function Custom404() {
    return (
        <>
            <Head>
                <title>The Den | ERROR</title>
            </Head>
            <div className={styles.container}>
                <main className={styles.loading}>
                    <Image
                        src="/donkCry.gif"
                        alt="donkCry"
                        width={128}
                        height={128}
                    />
                    <h1 className={styles.h1}>ERROR!</h1>
                    <hr className={styles.hr}/>
                    <h3 className={styles.h3}>This page could not be found.</h3>
                </main>
            </div>
        </>
    )
}