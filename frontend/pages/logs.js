import Head from 'next/head'
import Image from 'next/image'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import UserForm from '../components/UserForm.js'
import styles from '../styles/Home.module.css'


export default function logs() {
    return (
        <>
        <style>
            {`
            .nav-link {
                font-family: "Roboto", sans-serif;
                font-weight: bold;
                color: #b8b8b8;
                text-decoration: none;
            }
            
            .nav-link:hover {
                color: #42b983;
            }
            `}
        </style>
        <div className={styles.container}>
            <main className={styles.main}>
            <Image
                src="/DENNIES.png"
                alt="DENNIES Logo"
                width={128}
                height={128}
            />
            <h1 className={styles.h1}>The Den</h1>
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/clips">Clips</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/docs">Docs</Nav.Link>
                </Nav.Item>
            </Nav>
            <UserForm/>
            </main>
        </div>
        </>
    )
}