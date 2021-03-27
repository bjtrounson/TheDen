import Head from 'next/head'
import Header from '../../../components/Nav'
import Footer from '../../../components/Footer'
import styles from '../../../styles/clips.module.css'
var dateFormat = require("dateformat");

function ClipsViewer({ clips, url }) {
    return <>
        <Head>
            <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
            <script src="https://vjs.zencdn.net/7.10.2/video.min.js"></script>
        </Head>
        <Header />
        <main className="bg-dark">
            <div className={`container justify-content-center gx-3 px-3 shadow-lg ${styles.main}`}>
                <div className="container-fluid">
                    <video
                    id="my-video"
                    className={`video-js ${styles.video}`}
                    controls
                    preload="auto"
                    width="100%"
                    height="100%"
                    poster={`${url}/image/${clips.clip_id}.jpg`}
                    data-setup='{"fluid": "True", "playbackRates": [1, 1.5, 2]}'
                    >
                        <source src={`${url}/video/${ clips.clip_id }.mp4`} type="video/mp4" />
                        <p className="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a
                            web browser that
                            <a href="https://videojs.com/html5-video-support/" target="_blank"
                                >supports HTML5 video</a
                            >
                        </p>
                    </video>
                </div>
                <hr/>
                <div className={styles.cards}>
                    <div className="row" >
                        <h5 className="fw-bold text-light">{ clips.title }</h5>
                    </div>
                    <div className="row">
                        <small><a className={styles.userlinks} href={`https://twitch.tv/${ clips.broadcaster_name }`}>{`${clips.broadcaster_name}`}</a></small>
                        <small><a className={styles.userlinks} href={`https://twitch.tv/${ clips.creator_name }`}>{`${clips.creator_name}`}</a></small>
                    </div>
                    <div className="row" className={styles.bottom_info}>
                        <small className={styles.created_at}>{dateFormat(clips.created_at, "yyyy-mm-dd hh:MM:ss")}</small>
                        <small className={styles.download_button}><button className="btn btn-dark btn-sm"><a href={`https://twitch.tv/videos/${clips.video_id}`}>View Video</a></button></small>
                    </div>
                    <hr/>
                </div>
            </div>
        </main>
        <Footer/>
    </>
}

export const getServerSideProps = async (context) => { 
    var res = await fetch(`${process.env.API}/clips/id/${context.params.id}`);
    var clip = await res.json();
    const clips = clip[0]
    const url = `${process.env.PUBLIC_HOST}`
    return {
        props: {
            clips,
            url
        }
    }
}

export default ClipsViewer