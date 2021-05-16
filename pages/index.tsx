import Head from 'next/head'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Den</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      </Head>
      <Nav/>
    </div>
  )
}
