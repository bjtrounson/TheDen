import Head from 'next/head'
import Header from '../components/Nav'
import Footer from '../components/Footer'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import styles from '../styles/clips.module.css'

function clips ({ clipsRes }) { 
    return <>
        <div>
            <Head>
                <title>The Den | Logs</title>
            </Head>
            <Header />
            <div className={ styles.album }>
                    {clipsRes.map(clipsRes => (
                        <Container className={styles.clips}>
                            <Link style="text-decoration: none;" href={`/clips/${ clipsRes.clip_id }`}>
                                <Image
                                    className="card-img-top"
                                    src={ clipsRes.thumbnail_url }
                                    alt={ clipsRes.title }
                                    width={480}
                                    height={272}
                                />
                            </Link>
                            <Container className={styles.cards}>
                                <div className="row" >
                                    <h5 className="fw-bold text-light">{ clipsRes.title }</h5>
                                </div>
                                <div className="row">
                                    <small><a className={styles.userlinks} href={`https://twitch.tv/${ clipsRes.creator_name }`}>{ clipsRes.creator_name }</a></small>
                                </div>
                                <div className="row" className={styles.bottom_info}>
                                    <small className={styles.created_at}>{clipsRes.created_at}</small>
                                    <small className={styles.download_button}><button className="btn btn-dark btn-sm"><a href={ clipsRes.mp4_url }>Download</a></button></small>
                                </div>
                            </Container>
                        </Container>
                    ))} 
            </div>
            <Footer/>
        </div>
    </>
}

export const getServerSideProps = async (context) => { 
    var res = await fetch(`http://localhost:4000/clips`);
    var clipsRes = await res.json();
    return {
        props: {
            clipsRes
        }
    }
}

export default clips