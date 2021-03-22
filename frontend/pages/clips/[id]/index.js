import Head from 'next/head'
import Header from '../../../components/Nav'
import Footer from '../../../components/Footer'

function ClipsViewer({ clips }) {
    return <>
        <Head>
            <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
            <script src="https://vjs.zencdn.net/7.10.2/video.min.js"></script>
        </Head>
        <Header />
        <main className="bg-dark">
            <div className="container justify-content-center gx-3 px-3 shadow-lg">
                <video
                    id="my-video"
                    class="video-js"
                    controls
                    preload="auto"
                    width="100wh"
                    height="100vhlud"
                    poster=""
                    data-setup='{"fluid": "True", "playbackRates": [1, 1.5, 2]}'
                >
                    <source src={clips.mp4_url} type="video/mp4" />
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank"
                            >supports HTML5 video</a
                        >
                    </p>
                </video>
            </div>
        </main>
        <Footer/>
    </>
}

export const getServerSideProps = async (context) => { 
    var res = await fetch(`http://localhost:4000/clips/id/${context.params.id}`);
    var clip = await res.json();
    const clips = clip[0]
    return {
        props: {
            clips
        }
    }
}

export default ClipsViewer