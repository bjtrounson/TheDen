import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Den</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet"/> 
      </Head>

      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
