import Head from 'next/head'
import Header from '../components/Nav'
import Footer from '../components/Footer'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import styles from '../styles/clips.module.css'
var dateFormat = require("dateformat");
import axios from 'axios'

function clips({ clipsRes, url }) {
    const getClip = async event => {
        event.preventDefault();
        var url = event.target.url.value
        var clipId = url.split('/').pop();
        const r = await fetch(`https://api.twitch.tv/helix/clips?id=${clipId}`, { headers: { 'Authorization': process.env.oAuth, 'Client-Id': process.env.clientId } })
            .then(function (response) {
                if (response.status == 200) {
                    return response
                } else {
                    alert(`There was a ERROR check the URL or contact an admin!`)
                    return null
                }
            }).catch(function (err) {
                alert(`There was a error check the url or contact an admin: ${err.status}`)
            });
        console.log(r)
        if (!r) {
            return
        } else {
            var reply = await r.json();
            var reply = await reply["data"][0]
            axios({
                method: 'post',
                url: `${url}/clips`,
                headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
                data: {
                    "title": await event.target.title.value,
                    "broadcaster_name": await reply.broadcaster_name,
                    "creator_name": await reply.creator_name,
                    "created_at": await dateFormat(reply.created_at, "yyyy-mm-dd hh:MM:ss"),
                    "thumbnail_url": await reply.thumbnail_url,
                    "clip_url": await url,
                    "mp4_url": await reply.thumbnail_url.replace('-preview-480x272.jpg', '.mp4'),
                    "video_id": await reply.video_id,
                    "clip_id": await reply.id
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <Head>
                <title>The Den | Logs</title>
                <style>
                    {`
                        .form-label {
                            color: #b8b8b8;
                        }

                        form {
                            background-color: #424242;
                            border-radius: 6px;
                            padding: 1em;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                        }

                        .form-control {
                            margin-bottom: 0.5em;
                            margin-right: 0.5em;
                        }
                    `}
                </style>
            </Head>
            <Header />
            <div className={styles.clip_form}>
                <h1 className={styles.h1}>Submit Clips</h1>
                <Form onSubmit={getClip}>
                    <Form.Control placeholder="Clip Title" id="title" title="title" type="text" autoComplete="title" required />
                    <Form.Control placeholder="Clip URL" id="url" url="url" type="text" autoComplete="url" required/>
                    <Button className="btn-sm btn-dark" type="submit">Submit</Button>
                </Form>
            </div>
            <div className={ styles.album }>
                    {clipsRes.map(clipsRes => (
                        <Container key={clipsRes.clip_id} className={styles.clips}>
                            <Link style="text-decoration: none;" href={`/clips/${ clipsRes.clip_id }`}>
                                <Image
                                    className="card-img-top"
                                    src={`${url}/image/${clipsRes.clip_id}.jpg`}
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
                                    <small className={styles.created_at}>{dateFormat(clipsRes.created_at, "yyyy-mm-dd hh:MM:ss")}</small>
                                    <small className={styles.download_button}><button className="btn btn-dark btn-sm"><a target="_blank" download href={`${url}/video/${clipsRes.clip_id}.mp4`}>Download</a></button></small>
                                </div>
                            </Container>
                        </Container>
                    ))} 
            </div>
            <Footer/>
        </div>)
}

export const getServerSideProps = async (context) => {
    const url = `${process.env.PUBLIC_HOST}`
    var res = await fetch(`${process.env.API}/clips`);
    var clipsRes = await res.json();
    return {
        props: {
            clipsRes,
            url
        }
    }
}

export default clips