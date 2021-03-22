import Head from 'next/head'
import Image from 'next/image'
import Nav from 'react-bootstrap/Nav'
import styles from '../styles/Home.module.css'

export default function Home() {
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
          <Nav className="mr-auto">
            <Nav.Link href="/logs">Logs</Nav.Link>
            <Nav.Link href="/clips">Clips</Nav.Link>
            <Nav.Link href="/docs">Docs</Nav.Link>
          </Nav>
        </main>
      </div>
    </>
  )
}
