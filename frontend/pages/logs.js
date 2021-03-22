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
                color: #6768698e;
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
            <Nav className="">
                <Link href="/logs"><Nav.Link as="a" href="/logs"><a>Logs</a></Nav.Link></Link>,
                <Link href="/clips"><Nav.Link as="a" href="/clips"><a>Clips</a></Nav.Link></Link>,
                <Link href="/docs"><Nav.Link as="a" href="/docs"><a>Docs</a></Nav.Link></Link>
            </Nav>
            <UserForm/>
            </main>
        </div>
        </>
    )
}