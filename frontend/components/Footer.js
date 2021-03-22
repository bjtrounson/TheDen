import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => { 
    return (
        <>
            <footer className={styles.footer} >
                <a className="px-2" href="https://www.twitch.tv/bitcaastle"><Image src="/twitch-logo.svg" width="30" height="30" alt="twitch-logo"/></a>
                <a className="px-2" href="https://twitter.com/BiTCaastle"><Image src="/twitter-logo.svg" width="30" height="30" alt="twitter-logo"/></a>
                <a className="px-2" href="https://discord.gg/dennies"><Image src="/discord-logo.svg" width="30" height="30" alt="discord-logo"/></a>
                <a className="px-2" href="https://open.spotify.com/playlist/2dMZCqww19Ksgp2sIXGRHH?si=5460448f8fda4147"><Image src="/spotify-logo.png" width="30" height="30" alt="spotify-logo"/></a>
            </footer>
        </>
    )
}

export default Footer